<script lang="ts">
	import { site } from '$lib/site';
	import { Mail } from '@lucide/svelte';
	import { SIIcon } from '@willingtonortiz/svelte-simple-icons';
	import { siBilibili, siGithub } from 'simple-icons';
	import CurvedArrow from '$lib/components/svgs/CurvedArrow.svelte';
	import { getTheme } from '$lib/utils/theme.svelte';
	import ScrollReveal from './animations/ScrollReveal.svelte';

	let strokeColor = $state('');
	let theme = $derived(getTheme());

	$effect(() => {
		void theme;
		let styles = getComputedStyle(document.documentElement);
		strokeColor = styles.getPropertyValue('--color-foreground').trim();
	});
</script>

<div class="fixed bottom-0 left-0 ml-6 hidden flex-col items-center gap-1 lg:flex">
	<a
		class="my-2 flex items-center justify-center rounded-sm text-muted-foreground transition duration-300"
		href={site.socialLink.github}
		aria-label="Github"
		title="Github"
		target="_blank"
		rel="noopener noreferrer external"
	>
		<SIIcon class="text-foreground" icon={siGithub} />
	</a>
	<a
		class="my-2 flex items-center justify-center rounded-sm text-muted-foreground transition duration-300"
		href={site.socialLink.bilibili}
		aria-label="Bilibili"
		title="Bilibili"
		target="_blank"
		rel="noopener noreferrer external"
	>
		<SIIcon class="text-foreground" icon={siBilibili} />
	</a>
	<a
		class="my-2 flex items-center justify-center rounded-sm text-muted-foreground transition duration-300"
		href={site.socialLink.email}
		aria-label="Email"
		title="Email"
		rel="external"
	>
		<Mail class="text-foreground" />
	</a>
	<div class="mt-1 h-20 w-1 bg-foreground"></div>
	{#key theme}
		<CurvedArrow
			class="absolute -top-1 -right-25 hidden h-30 w-20 xl:block"
			strokeWidth={5}
			stroke={strokeColor}
		/>
	{/key}
	<ScrollReveal class="absolute -top-2 -right-32 hidden xl:block">
		<div class="text-sm font-bold text-foreground">Contact Me</div>
	</ScrollReveal>
</div>
