export const LOCALES = [
	{ code: 'zh-cn', lang: 'zh-CN', ogLocale: 'zh_CN', label: '中文' },
	{ code: 'en', lang: 'en', ogLocale: 'en_US', label: 'English' }
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];
export type Locale = (typeof LOCALES)[number];

export function detectLocale(language = ''): LocaleCode {
	return language.toLowerCase().startsWith('zh') ? 'zh-cn' : 'en';
}

export function localeFromPath(pathname: string): Locale {
	if (pathname.endsWith('en')) {
		return LOCALES[1];
	} else {
		return LOCALES[0];
	}
}

export function anotherLocale(current: Locale) {
	if (current.code === 'zh-cn') {
		return LOCALES[1];
	} else {
		return LOCALES[0];
	}
}
