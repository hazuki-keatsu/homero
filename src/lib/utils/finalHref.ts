import { resolve } from '$app/paths';

export const finalHref = (href: string) => {
	if (/^(https?:|mailto:|tel:|ftp:)/i.test(href) || href.startsWith('#')) {
		return href;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return resolve(href as any);
};
