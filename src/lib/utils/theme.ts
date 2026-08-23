// Warning: The top module can not effect DOM, cause SSR will execute this module.
// All the DOM operation should be executed in initTheme()

const THEME_KEY = 'theme';
const LIGHT = 'light';
const DARK = 'dark';

let themeValue: string;

function getPreferredTheme(): string {
	const stored = localStorage.getItem(THEME_KEY);
	if (stored) return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
}

function persist(): void {
	localStorage.setItem(THEME_KEY, themeValue);
	reflect();
}

function reflect(): void {
	const root = document.firstElementChild;
	root?.setAttribute('data-theme', themeValue);

	// Fill the page background by the calculated page background color.
	// Make the Android browser being the same color with the page background.
	const bg = window.getComputedStyle(document.body).backgroundColor;
	document.querySelector("meta[name='theme-color']")?.setAttribute('content', bg);
}

export function initTheme(): void {
	themeValue =
		(window as unknown as { __theme?: { value: string } }).__theme?.value ?? getPreferredTheme();
	reflect();

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
		themeValue = matches ? DARK : LIGHT;
		persist();
	});
}

export function toggleTheme(): void {
	themeValue = themeValue === LIGHT ? DARK : LIGHT;
	persist();
}
