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
  send: (body: string) => void;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

const getHeader = (headers: VercelRequest['headers'], name: string) => {
  const value = headers[name];
  return Array.isArray(value) ? value[0] : value;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.status(405).send('Method not allowed');
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = getHeader(request.headers, 'stripe-signature');

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret || !signature) {
    response.status(500).send('Stripe webhook is not configured');
    return;
  }

  const rawBody = typeof request.body === 'string'
    ? request.body
    : Buffer.isBuffer(request.body)
      ? request.body
      : Buffer.from(JSON.stringify(request.body ?? {}));

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    response.status(400).send('Invalid webhook signature');
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const messageId = session.metadata?.messageId;

    if (messageId) {
      await adminDb.collection('messages').doc(messageId).update({ isPremium: true });
    }
  }

  response.status(200).json({ received: true });
}
