<script>
	import { site } from '$lib/site';
	import Footer from './Footer.svelte';
	import Hero from './Hero.svelte';
	import Projects from './Projects.svelte';
	import Self from './Self.svelte';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={`${site.origin}/`} />
</svelte:head>

<main>
	<Hero />
	<Self />
	<Projects />
	<Footer />
</main>
