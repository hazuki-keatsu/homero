<script lang="ts">
	import { switchTheme, getTheme } from '$lib/utils/theme.svelte';
	import Link from '$lib/components/Link.svelte';
	import Switcher from '$lib/components/Switcher.svelte';
	import { localeFromPath, anotherLocale } from '$lib/utils/i18n';
	import { page } from '$app/state';

	let lang = $state(localeFromPath(page.route.id ?? ''));
	let anotherLang = $derived(anotherLocale(lang));

	const toggleTheme = (status: boolean) => {
		if (status) {
			switchTheme('light');
		} else {
			switchTheme('dark');
		}
	};

	let themeValueBool = $derived(getTheme() === 'light');
</script>

<header class="sticky top-0 z-30 flex items-center justify-between bg-card px-6 py-2">
	<Link noUnderlined={true} href="/{lang.code}" class="text-xl font-bold"
		><span
			class={[
				'bg-linear-to-r bg-clip-text text-transparent',
				'from-blue to-cyan',
				'dark:from-emerald dark:to-violet'
			]}>Hazuki</span
		> Keatsu</Link
	>
	<nav class="flex items-center gap-3">
		<Link target="_blank" href="https://blog.keatsu.top">
			{#if lang.code === 'en'}
				Blog
			{:else}
				博客
			{/if}
		</Link>
	</nav>
	<div class="flex items-center gap-2">
		<Link href={'/' + anotherLang.code}>{anotherLang.label}</Link>
		<p>
			{#if lang.code === 'en'}
				Light Mode
			{:else}
				亮色模式
			{/if}
		</p>
		<Switcher onchange={toggleTheme} checked={themeValueBool}></Switcher>
	</div>
</header>
