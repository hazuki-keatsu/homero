import { site } from '$lib/site';
import { LOCALES } from '$lib/utils/i18n';

export const prerender = true;

const alternates = (self: string) =>
	LOCALES.filter((l) => l.code !== self)
		.map(
			(l) =>
				`\n    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${site.origin}/${l.code}"/>`
		)
		.join('');

export function GET() {
	const urls = LOCALES.map(
		(l) => `  <url>
    <loc>${site.origin}/${l.code}</loc>${alternates(l.code)}
  </url>`
	).join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(xml, { headers: { 'content-type': 'application/xml' } });
}
