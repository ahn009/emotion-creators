// Vercel Edge Function: Serves pre-rendered HTML to search engine bots via prerender.io
// Normal users get the standard SPA experience

const BOT_AGENTS = [
  'googlebot',
  'yahoo! slurp',
  'bingbot',
  'yandex',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot',
  'google-inspectiontool',
];

const PRERENDER_URL = 'https://service.prerender.io/';
const SITE_URL = 'https://emotion-creators.vercel.app';

export const config = {
  runtime: 'edge',
};

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some((bot) => ua.includes(bot));
}

function shouldPrerender(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Skip static assets, API routes, and files with extensions
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.match(/\.(js|css|xml|json|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|map|txt)$/)
  ) {
    return false;
  }

  // Check for _escaped_fragment_ (legacy but still used)
  if (url.searchParams.has('_escaped_fragment_')) {
    return true;
  }

  return isBot(request.headers.get('user-agent'));
}

export default async function handler(request) {
  if (!shouldPrerender(request)) {
    // Serve the normal SPA index.html for regular users
    const url = new URL(request.url);
    const indexUrl = new URL('/index.html', url.origin);
    return fetch(indexUrl);
  }

  const prerenderToken = process.env.PRERENDER_TOKEN;
  if (!prerenderToken) {
    // No token configured - fall back to normal SPA
    const url = new URL(request.url);
    const indexUrl = new URL('/index.html', url.origin);
    return fetch(indexUrl);
  }

  // Build the prerender.io URL
  const url = new URL(request.url);
  const targetUrl = `${SITE_URL}${url.pathname}${url.search}`;
  const prerenderRequestUrl = `${PRERENDER_URL}${targetUrl}`;

  try {
    const prerenderResponse = await fetch(prerenderRequestUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
      },
      redirect: 'follow',
    });

    if (!prerenderResponse.ok) {
      // Prerender failed - fall back to normal SPA
      const indexUrl = new URL('/index.html', url.origin);
      return fetch(indexUrl);
    }

    const html = await prerenderResponse.text();

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        'X-Prerender': 'true',
      },
    });
  } catch {
    // On any error, fall back to the normal SPA
    const indexUrl = new URL('/index.html', url.origin);
    return fetch(indexUrl);
  }
}
