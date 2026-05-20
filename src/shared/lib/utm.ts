export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign?: string;
}

export const buildUtmUrl = (url: string, params: UtmParams): string => {
  const parsed = new URL(url, 'https://emotion-creators.vercel.app');
  Object.entries(params).forEach(([key, value]) => {
    if (value) parsed.searchParams.set(key, value);
  });
  return parsed.toString();
};

export const buildShareUrl = (messageId: string, source: string): string => {
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://emotion-creators.vercel.app';
  const url = `${base}/m/${messageId}`;
  return buildUtmUrl(url, {
    utm_source: source,
    utm_medium: 'share',
    utm_campaign: 'message_share',
  });
};
