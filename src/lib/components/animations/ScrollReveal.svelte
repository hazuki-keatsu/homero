<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let {
		class: className,
		children,
		start = 'top bottom',
		end,
		y = 80,
		opacity = 0,
		duration = 0.8,
		ease = 'power2.out',
		toggleActions = 'play none none none',
		once = true,
		markers = false
	}: {
		class: string[] | string;
		children: Snippet;
		start?: string | number | ScrollTrigger.StartEndFunc;
		end?: string | number | ScrollTrigger.StartEndFunc;
		y?: number;
		opacity?: number;
		duration?: number;
		ease?: string | gsap.EaseFunction;
		toggleActions?: string;
		once?: boolean;
		markers?: boolean | ScrollTrigger.MarkersVars;
	} = $props();

	let element: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!element) return;

		const triggerConfig: ScrollTrigger.Vars = {
			trigger: element,
			start,
			toggleActions,
			once,
			markers
		};

		if (end) triggerConfig.end = end;

		const tl = gsap.fromTo(
			element,
			{ y: y, opacity: opacity },
			{
				y: 0,
				opacity: 1,
				duration,
				ease,
				scrollTrigger: triggerConfig
			}
		);

		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	});
</script>

<div class={[className].flat()} style:overflow="hidden">
	<div bind:this={element} class="scroll-reveal" style:opacity style:transform="translateY({y}px)">
		{@render children()}
	</div>
</div>

<style>
	.scroll-reveal {
		will-change: transform, opacity;
	}
</style>
