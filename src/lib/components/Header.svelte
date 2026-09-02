<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import { anotherLocale, type Locale } from '$lib/utils/i18n';

	let { lang }: { lang: Locale } = $props();

	let anotherLang = $derived(anotherLocale(lang));
</script>

<header
	class={[
		'fixed inset-x-0 z-30 mx-auto flex items-center justify-between bg-card/50 px-3 py-3 backdrop-blur-md transition-[padding] md:px-6'
	]}
>
	<Link noUnderlined={true} href="/{lang.code}" class="text-lg font-bold md:text-xl"
		>Hazuki Keatsu</Link
	>
	<div class="flex gap-6">
		<nav class="flex items-center gap-6">
			<Link href="#hero">Hero</Link>
			<Link href="#self">About</Link>
			<Link href="#projects">Projects</Link>
		</nav>
		<div class="flex items-center">|</div>
		<div class="flex items-center gap-3">
			<Link data-sveltekit-noscroll href={'/' + anotherLang.code}>{anotherLang.label}</Link>
			<ThemeButton {lang} />
		</div>
	</div>
</header>
