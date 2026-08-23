import type { Handle } from '@sveltejs/kit';
import { localeFromPath } from '$lib/utils/i18n';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace(/%lang%/g, localeFromPath(event.url.pathname).lang)
	});
