<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { getTheme, toggleTheme } from '$lib/utils/theme.svelte';
	import type { Locale } from '$lib/utils/i18n';

	let { lang }: { lang: Locale } = $props();

	let theme = $derived(getTheme());

	// The visible icon is the mode the button switches TO (light → moon, dark → sun),
	// so the icon reads as the action itself, not the current state.
	let label = $derived(
		lang.code === 'en'
			? theme === 'light'
				? 'Switch to dark mode'
				: 'Switch to light mode'
			: theme === 'light'
				? '切换到暗色模式'
				: '切换到亮色模式'
	);
</script>

<button
	type="button"
	aria-label={label}
	title={label}
	class="flex size-9 overflow-hidden rounded-sm bg-card transition-colors hover:bg-muted"
	onclick={toggleTheme}
>
	<span class="track" class:dark={theme === 'dark'}>
		<span class="slot"><Moon size={18} strokeWidth={1.75} /></span>
		<span class="slot"><Sun size={18} strokeWidth={1.75} /></span>
	</span>
</button>

<style>
	button .track {
		display: flex;
		width: 72px;
		transform: translateX(0);
		transition: transform 0.25s ease;
	}

	button .track.dark {
		transform: translateX(-36px);
	}

	button .slot {
		display: flex;
		width: 36px;
		height: 36px;
		align-items: center;
		justify-content: center;
	}
</style>
