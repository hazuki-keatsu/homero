export const LOCALES = [
	{ code: 'zh-cn', lang: 'zh-CN', ogLocale: 'zh_CN', label: '中文' },
	{ code: 'en', lang: 'en', ogLocale: 'en_US', label: 'English' }
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];
export type Locale = (typeof LOCALES)[number];

/** Detect the locale from a BCP47 language tag. */
export function detectLocale(language = ''): LocaleCode {
	return language.toLowerCase().startsWith('zh') ? 'zh-cn' : 'en';
}

/** Map a pathname to a locale. Defaults to en. */
export function localeFromPath(pathname: string): Locale {
	return (
		LOCALES.find((l) => pathname === `/${l.code}` || pathname.startsWith(`/${l.code}/`)) ??
		LOCALES.find((l) => l.code === 'en')!
	);
}
