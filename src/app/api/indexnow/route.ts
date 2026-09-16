const INDEXNOW_KEY = '8cc919ef-f0c6-4665-b566-4956e4f4496b';
const HOST = 'anasmasama.dev';
const KEY_URL = `https://${HOST}/.well-known/indexnow.txt`;

// Pages currently in the sitemap. Update this list as you add routes.
const URLS = [
  'https://anasmasama.dev/',
  'https://anasmasama.dev/labs',
];

async function submit() {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_URL,
      urlList: URLS,
    }),
  });
  return res;
}

export async function POST() {
  const res = await submit();
  return Response.json({
    ok: res.ok,
    status: res.status,
    message: res.ok
      ? 'IndexNow submission accepted.'
      : 'IndexNow submission failed.',
  });
}

// Convenience GET so you can trigger a re-crawl with a simple browser hit or curl.
export async function GET() {
  return POST();
}
