<script lang="ts">
	import { SIIcon } from '@willingtonortiz/svelte-simple-icons';
	import type { SimpleIcon } from 'simple-icons';

	export type BadgeProps = {
		text?: string;
		icon: SimpleIcon;
		class?: string | string[];
	};

	let { text, icon, class: className }: BadgeProps = $props();

	// The brand color is only a hover tint (color moment, not permanent noise).
	// Rust's brand hex is pure black — lift near-black colors so the icon stays
	// visible against the card background.
	let hoverColor = $derived.by(() => {
		const color = icon.hex;
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		return 0.2126 * r + 0.7152 * g + 0.0722 * b < 30 ? 'var(--color-foreground)' : color;
	});
</script>

<div
	class={[
		'group flex items-center rounded-full border border-border bg-card px-2 py-1 text-muted-foreground transition-[color] duration-200 hover:border-muted hover:text-foreground',
		className
	].flat()}
	style:--badge-hover={hoverColor}
>
	<SIIcon class="p-1 transition-colors duration-200 group-hover:text-(--badge-hover)" {icon} />
	{#if text !== null}
		<span class="pr-1 text-base sm:text-lg">{text}</span>
	{/if}
</div>
