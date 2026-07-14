const SITE_URL = 'https://anasmasama.dev';
const FULL_NAME = 'Anas Abubakar Masama';

export async function GET() {
  const now = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${FULL_NAME} — Software Engineer &amp; AI Developer</title>
    <link>${SITE_URL}</link>
    <description>Portfolio and updates from ${FULL_NAME}, a Software Engineer, AI Developer, and Founder of TeenovateX Labs based in Lagos, Nigeria.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <managingEditor>anasabubakar7000@gmail.com (${FULL_NAME})</managingEditor>
    <webMaster>anasabubakar7000@gmail.com (${FULL_NAME})</webMaster>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>Portfolio — ${FULL_NAME}</title>
      <link>${SITE_URL}</link>
      <description>Explore the portfolio of ${FULL_NAME} — high-performance web applications, AI-powered platforms, and open-source projects built with Next.js, TypeScript, React, and Firebase.</description>
      <pubDate>${now}</pubDate>
      <guid isPermaLink="true">${SITE_URL}</guid>
    </item>
    <item>
      <title>Projects by ${FULL_NAME}</title>
      <link>${SITE_URL}/projects</link>
      <description>Full project archive: JackPal, TeenovateX Labs, MarcediVault, EduPeak, Ilmeen, Empower-You, Pill-Pal, MonieFlow, and more.</description>
      <pubDate>${now}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/projects</guid>
    </item>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
