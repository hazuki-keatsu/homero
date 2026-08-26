<script lang="ts">
	import { page } from '$app/state';
	import { localeFromPath } from '$lib/utils/i18n';

	let { children } = $props();

	const locale = $derived(localeFromPath(page.url.pathname));

	// transformPageChunk handles the server/prerender output; keep documentElement.lang
	// in sync on client-side navigations.
	$effect(() => {
		document.documentElement.lang = locale.lang;
	});
</script>

{@render children()}
