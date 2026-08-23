<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import { site } from '$lib/site';
	import { LOCALES, localeFromPath } from '$lib/utils/i18n';
	import { toggleTheme } from '$lib/utils/theme';

	let { children } = $props();

	const locale = $derived(localeFromPath(page.url.pathname));

	// transformPageChunk handles the server/prerender output; keep documentElement.lang
	// in sync on client-side navigations.
	$effect(() => {
		document.documentElement.lang = locale.lang;
	});
</script>

<header class="flex items-center justify-between border-b border-border px-6 py-4">
	<a href={resolve(`/${locale.code}`)} class="font-medium text-foreground">{site.name}</a>
	<nav class="flex items-center gap-3">
		{#each LOCALES as l (l.code)}
			<a
				href={resolve(`/${l.code}`)}
				class="text-muted-foreground"
				aria-current={l.code === locale.code ? 'page' : undefined}
			>
				{l.label}
			</a>
		{/each}
		<Button onclick={toggleTheme}>theme</Button>
	</nav>
</header>
<main>{@render children()}</main>
