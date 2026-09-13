<script lang="ts">
	import type { BadgeProps } from '$lib/components/Badge.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import ScrollDown from '$lib/components/ScrollDown.svelte';
	import Typewriter from '$lib/components/animations/Typewriter.svelte';
	import { siFlutter, siRust, siSvelte, siTypescript } from 'simple-icons';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	onMount(() => {
		// The single orchestrated entrance of the page: one staggered rise,
		// then everything settles. Skipped for reduced-motion users.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.fromTo(
			'.hero-enter',
			{ y: 24, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.1 }
		);
	});

	let badges: BadgeProps[] = [
		{
			text: 'Flutter',
			icon: siFlutter
		},
		{
			text: 'Svelte',
			icon: siSvelte
		},
		{
			text: 'Rust',
			icon: siRust
		},
		{
			text: 'Typescript',
			icon: siTypescript
		}
	];

	let typingNote = $state(0);

	function onComplete() {
		typingNote++;
	}

	let typewriterClass = 'absolute top-0 left-0';
	let typewriterTextClass = 'text-xl text-foreground md:text-2xl';
</script>

<section
	id="hero"
	class="relative mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 pt-16 pb-24"
>
	<h1 class="hero-enter -ml-1 text-6xl font-black tracking-tight md:text-7xl">Hazuki Keatsu</h1>

	<div class="hero-enter relative mt-6 h-6 font-mono">
		<Typewriter
			class={typewriterClass}
			textClass={typewriterTextClass}
			start={typingNote % 3 === 0}
			showCaret={typingNote % 3 === 0}
			loop={true}
			onDeleteComplete={onComplete}
			text="Front-end Engineering"
		/>
		<Typewriter
			class={typewriterClass}
			textClass={typewriterTextClass}
			start={typingNote % 3 === 1}
			showCaret={typingNote % 3 === 1}
			loop={true}
			onDeleteComplete={onComplete}
			text="Source Compiler"
		/>
		<Typewriter
			class={typewriterClass}
			textClass={typewriterTextClass}
			start={typingNote % 3 === 2}
			showCaret={typingNote % 3 === 2}
			loop={true}
			onDeleteComplete={onComplete}
			text="Open-source Software"
		/>
	</div>

	<p class="hero-enter mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
		An undergraduate at Xidian University majoring in Software Engineering. I am proficient in using
		the frameworks like Flutter and Svelte. Rust is my favorite which I used for my own compiler
		project.
	</p>

	<div class="hero-enter mt-6 flex max-w-2xl flex-wrap gap-3 sm:gap-5">
		{#each badges as badge, index (`badge-${index}`)}
			<Badge text={badge.text} icon={badge.icon} />
		{/each}
	</div>

	<ScrollDown href="#self" class="absolute right-6 bottom-12" />
</section>
