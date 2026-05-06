import Stripe from 'stripe';

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

const getOrigin = (request: VercelRequest) => {
  const origin = request.headers.origin;
  if (typeof origin === 'string') return origin;
  return 'https://emotion-creators.vercel.app';
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

  const origin = getOrigin(request);
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
}
