<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SocialLink from '$lib/components/SocialLink.svelte';

	let { children } = $props();
</script>

<Header />
{@render children()}
<SocialLink />
