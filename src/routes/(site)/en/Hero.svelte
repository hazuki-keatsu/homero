<script lang="ts">
	import ScrollDown from '$lib/components/ScrollDown.svelte';
</script>

<section
	id="hero"
	class="relative mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 pt-16 pb-24"
>
	<h1 class="-ml-1 text-6xl font-bold md:text-7xl">Hazuki Keatsu</h1>

	<p class="mt-6 text-xl text-accent md:text-2xl">
		Front-end Engineering · Compiler · Open-source Software
	</p>

	<p class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
		An undergraduate at Xidian University majoring in Software Engineering. I am proficient in using
		the frameworks like Flutter and Svelte. Rust is my favorite which I used for my own compiler
		project.
	</p>

	<ScrollDown class="absolute right-6 bottom-12" />
</section>
