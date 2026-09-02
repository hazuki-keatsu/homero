<script lang="ts">
	import type { BadgeProps } from '$lib/components/Badge.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import ScrollDown from '$lib/components/ScrollDown.svelte';
	import Typewriter from '$lib/components/animations/Typewriter.svelte';
	import { siFlutter, siRust, siSvelte, siTypescript } from 'simple-icons';

	let badges: BadgeProps[] = [
		{
			text: 'Flutter',
			icon: siFlutter,
			color: siFlutter.hex
		},
		{
			text: 'Svelte',
			icon: siSvelte,
			color: siSvelte.hex
		},
		{
			text: 'Rust',
			icon: siRust,
			color: siRust.hex
		},
		{
			text: 'Typescript',
			icon: siTypescript,
			color: siTypescript.hex
		}
	];

	let typingNote = $state(0);

	function onComplete() {
		typingNote++;
	}

	let typewriterClass = "absolute top-0 left-0";
	let typewriterTextClass = "text-xl text-foreground md:text-2xl"
</script>

<section
	id="hero"
	class="relative mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 pt-16 pb-24"
>
	<h1 class="-ml-1 text-6xl font-bold md:text-7xl">Hazuki Keatsu</h1>

	<div class="relative mt-6 h-6 font-mono">
		<Typewriter
			class={typewriterClass}
			textClass={typewriterTextClass}
			start={typingNote % 3 === 0}
			loop={true}
			onDeleteComplete={onComplete}
			text="Front-end Engineering"
		/>
		<Typewriter
			class={typewriterClass}
			textClass={typewriterTextClass}
			start={typingNote % 3 === 1}
			loop={true}
			onDeleteComplete={onComplete}
			text="Source Compiler"
		/>
		<Typewriter
			class={typewriterClass}
			textClass={typewriterTextClass}
			start={typingNote % 3 === 2}
			loop={true}
			onDeleteComplete={onComplete}
			text="Open-source Software"
		/>
	</div>

	<p class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
		An undergraduate at Xidian University majoring in Software Engineering. I am proficient in using
		the frameworks like Flutter and Svelte. Rust is my favorite which I used for my own compiler
		project.
	</p>

	<div class="mt-6 flex max-w-2xl gap-5">
		{#each badges as badge, index (`badge-${index}`)}
			<Badge text={badge.text} color={badge.color} icon={badge.icon} />
		{/each}
	</div>

	<ScrollDown href="#self" class="absolute right-6 bottom-12" />
</section>
