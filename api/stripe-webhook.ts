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

const readRawBody = async (request: VercelRequest): Promise<Buffer> => {
  if (Buffer.isBuffer(request.body)) return request.body;
  if (typeof request.body === 'string') return Buffer.from(request.body);

  const chunks: Buffer[] = [];
  for await (const chunk of request as AsyncIterable<Buffer | string>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
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

  const rawBody = await readRawBody(request);

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
    const isPaid = session.payment_status === 'paid';

    if (messageId && isPaid) {
      await adminDb.collection('messages').doc(messageId).update({ isPremium: true });
    }
  }

  response.status(200).json({ received: true });
}
