<script lang="ts">
	import { SIIcon } from '@willingtonortiz/svelte-simple-icons';
	import type { SimpleIcon } from 'simple-icons';
	import { getTheme } from '$lib/utils/theme.svelte';

	export type BadgeProps = {
		text: string;
		icon: SimpleIcon;
		color: string;
	};

	let { text, icon, color }: BadgeProps = $props();

	let theme = $derived(getTheme());

    // percent range is from -1 to 1.
    // The positive percent is used to darken the hex color,
    // and the negative percent is used to lighten the hex color.
	function darkenHexHSL(hex: string, percent: number): string {
		const clean = hex.replace('#', '');
		const r = parseInt(clean.substring(0, 2), 16);
		const g = parseInt(clean.substring(2, 4), 16);
		const b = parseInt(clean.substring(4, 6), 16);

		let r1 = r / 255;
		let g1 = g / 255;
		let b1 = b / 255;

		const max = Math.max(r1, g1, b1);
		const min = Math.min(r1, g1, b1);
		let h = 0,
			s = 0,
			l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			if (max === r1) {
				h = ((g1 - b1) / d) % 6;
			} else if (max === g1) {
				h = (2 + (b1 - r1) / d) % 6;
			} else {
				h = (4 + (r1 - g1) / d) % 6;
			}
			h = h / 6;
		}

		l = l * (1 - percent);
		l = Math.min(1, Math.max(0, l));

		let r2, g2, b2;
		if (s === 0) {
			r2 = g2 = b2 = l;
		} else {
			const hue2rgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r2 = hue2rgb(p, q, h + 1 / 3);
			g2 = hue2rgb(p, q, h);
			b2 = hue2rgb(p, q, h - 1 / 3);
		}

		const r3 = Math.round(r2 * 255);
		const g3 = Math.round(g2 * 255);
		const b3 = Math.round(b2 * 255);
		return [r3, g3, b3].map((c) => c.toString(16).padStart(2, '0')).join('');
	}

	function hexToRgb(hex: string) {
		const clean = hex.replace('#', '');
		const bigint = parseInt(clean, 16);
		return {
			r: (bigint >> 16) & 255,
			g: (bigint >> 8) & 255,
			b: bigint & 255
		};
	}

	function getLuminance(r: number, g: number, b: number) {
		const [rs, gs, bs] = [r, g, b].map((c) => {
			c = c / 255;
			return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
	}

	let rgb = $derived(hexToRgb(color));
	let luminance = $derived(getLuminance(rgb.r, rgb.g, rgb.b));
	let textColor = $derived(luminance > 0.5 ? '#000000' : '#ffffff');
	let bgColor = $derived.by(() => {
		if (theme === 'dark') {
			return darkenHexHSL(color, 0.25);
		} else {
			return color;
		}
	});
</script>

<div
	class="container flex items-center rounded-full px-2 py-1 transition-colors duration-200"
	style:--badge-bg-color="#{bgColor}"
	style="color: {textColor};"
>
	<SIIcon class="badge-icon p-1" {color} {icon} />
	<span class="text-base sm:text-lg">{text}</span>
</div>

<style>
	.container {
		background-color: var(--badge-bg-color);
	}
</style>
