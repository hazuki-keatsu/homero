<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { detectLocale } from '$lib/utils/i18n';

	onMount(() => {
		// `+` widens to string; resolve() requires route-literal typing
		const target = ('/' + detectLocale(navigator.language)) as '/zh-cn' | '/en';
		goto(resolve(target), { replaceState: true });
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
