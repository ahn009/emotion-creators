type TemplatePromptKey = 'love' | 'sorry' | 'birthday' | 'gratitude' | 'congrats';
type Tone = 'Romantic' | 'Funny' | 'Formal' | 'Heartfelt' | 'Casual';

interface GenerateMessageBody {
  template: string;
  senderName: string;
  recipientName: string;
  tone: Tone;
  context?: string;
}

interface VercelRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const prompts: Record<TemplatePromptKey, string> = {
  love: 'You write heartfelt, sincere love messages. Avoid cliches. Be specific and warm.',
  sorry: 'You write genuine apology messages. Be accountable, not defensive. Show empathy.',
  birthday: 'You write joyful birthday messages. Be warm, personal, celebratory.',
  gratitude: "You write sincere thank-you messages. Be specific about what you're grateful for.",
  congrats: 'You write enthusiastic congratulation messages. Be genuine and uplifting.',
};

const limiter = new Map<string, { date: string; count: number }>();

const getClientIp = (request: VercelRequest): string => {
  const forwardedFor = request.headers['x-forwarded-for'];
  if (Array.isArray(forwardedFor)) return forwardedFor[0] ?? 'unknown';
  return forwardedFor?.split(',')[0]?.trim() || request.socket?.remoteAddress || 'unknown';
};

const isAllowed = (ip: string): boolean => {
  const today = new Date().toISOString().slice(0, 10);
  const current = limiter.get(ip);

  if (!current || current.date !== today) {
    limiter.set(ip, { date: today, count: 1 });
    return true;
  }

  if (current.count >= 3) return false;

  limiter.set(ip, { ...current, count: current.count + 1 });
  return true;
};

const parseBody = (body: unknown): GenerateMessageBody | null => {
  if (typeof body !== 'object' || body === null) return null;
  const record = body as Record<string, unknown>;
  const template = typeof record.template === 'string' ? record.template : '';
  const senderName = typeof record.senderName === 'string' ? record.senderName : '';
  const recipientName = typeof record.recipientName === 'string' ? record.recipientName : '';
  const tone = typeof record.tone === 'string' ? record.tone : '';
  const context = typeof record.context === 'string' ? record.context : undefined;
  const validTones: Tone[] = ['Romantic', 'Funny', 'Formal', 'Heartfelt', 'Casual'];

  if (!template || !senderName || !recipientName || !validTones.includes(tone as Tone)) {
    return null;
  }

  return { template, senderName, recipientName, tone: tone as Tone, context };
};

const normalizeTemplate = (template: string): TemplatePromptKey => {
  if (template === 'congratulations') return 'congrats';
  if (template === 'motivation' || template === 'encouragement') return 'congrats';
  if (template === 'missing-you' || template === 'miss-you' || template === 'friendship') return 'love';
  if (template in prompts) return template as TemplatePromptKey;
  return 'love';
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

  const body = parseBody(request.body);
  if (!body) {
    response.status(400).json({ error: 'Invalid request body' });
    return;
  }

  const ip = getClientIp(request);
  if (!isAllowed(ip)) {
    response.status(429).json({ error: 'Free AI generation limit reached for today' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    response.status(500).json({ error: 'AI generation is not configured' });
    return;
  }

  const templateKey = normalizeTemplate(body.template);
  const userPrompt = [
    `Write a ${body.tone.toLowerCase()} message from ${body.senderName} to ${body.recipientName}.`,
    body.context ? `Specific details to include: ${body.context}` : undefined,
    'Keep it personal, polished, and under 180 words.',
  ].filter(Boolean).join('\n');

  const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-3-5-20241022',
      max_tokens: 360,
      temperature: 0.8,
      system: prompts[templateKey],
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!anthropicResponse.ok) {
    response.status(502).json({ error: 'AI generation failed' });
    return;
  }

  const data = await anthropicResponse.json() as {
    content?: Array<{ type?: string; text?: string }>;
  };
  const message = data.content?.find((block) => block.type === 'text')?.text?.trim();

  if (!message) {
    response.status(502).json({ error: 'AI generation returned no message' });
    return;
  }

  response.status(200).json({ message });
}
