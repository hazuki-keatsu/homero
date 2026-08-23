<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { site } from '$lib/site';
	import { LOCALES, localeFromPath } from '$lib/utils/i18n';

	// mdsvex spreads frontmatter as props and renders the markdown into the default slot
	let {
		title = '',
		description = '',
		children
	}: {
		title?: string;
		description?: string;
		children: Snippet;
	} = $props();

	const locale = $derived(localeFromPath(page.url.pathname));
	const url = $derived(`${site.origin}/${locale.code}`);
	const descriptionFinal = $derived(description || site.description[locale.code]);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={descriptionFinal} />
	<link rel="canonical" href={url} />
	{#each LOCALES as l (l.code)}
		<link rel="alternate" hreflang={l.lang} href={`${site.origin}/${l.code}`} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${site.origin}/en`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={descriptionFinal} />
	<meta property="og:url" content={url} />
	<meta property="og:locale" content={locale.ogLocale} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={descriptionFinal} />
</svelte:head>

<article class="mx-auto prose w-full max-w-3xl px-6 py-12">
	{@render children()}
</article>
