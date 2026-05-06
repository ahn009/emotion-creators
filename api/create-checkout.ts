import Stripe from 'stripe';
import { adminDb } from './_firebaseAdmin';

interface VercelRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
const DEFAULT_ORIGIN = process.env.APP_ORIGIN ?? 'https://emotion-creators.vercel.app';

const getAllowedOrigins = (): Set<string> => {
  const configured = (process.env.ALLOWED_CHECKOUT_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([DEFAULT_ORIGIN, 'http://localhost:5173', ...configured]);
};

const getOrigin = (request: VercelRequest) => {
  const origin = request.headers.origin;
  if (typeof origin === 'string' && getAllowedOrigins().has(origin)) return origin;
  return DEFAULT_ORIGIN;
};

const getMessageId = (body: unknown): string | null => {
  if (typeof body !== 'object' || body === null) return null;
  const messageId = (body as Record<string, unknown>).messageId;
  return typeof messageId === 'string' && messageId.length > 0 ? messageId : null;
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(204).json({});
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    response.status(500).json({ error: 'Stripe is not configured' });
    return;
  }

  const messageId = getMessageId(request.body);
  if (!messageId) {
    response.status(400).json({ error: 'Missing messageId' });
    return;
  }

  try {
    const origin = getOrigin(request);
    const messageDoc = await adminDb.collection('messages').doc(messageId).get();
    if (!messageDoc.exists) {
      response.status(404).json({ error: 'Message not found' });
      return;
    }

    const messageData = messageDoc.data() as { isPremium?: boolean } | undefined;
    if (messageData?.isPremium) {
      response.status(400).json({ error: 'Message is already premium' });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'EmotionCreator Premium Message',
              description: 'Remove branding and unlock premium extras for one message.',
            },
            unit_amount: 299,
          },
          quantity: 1,
        },
      ],
      metadata: { messageId },
      success_url: `${origin}/m/${messageId}?upgraded=1`,
      cancel_url: `${origin}/create/success?id=${messageId}`,
    });

    response.status(200).json({ url: session.url });
  } catch {
    response.status(500).json({ error: 'Could not start checkout' });
  }
}
