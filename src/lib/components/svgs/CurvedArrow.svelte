<script lang="ts">
	import { onMount } from 'svelte';

	let {
		class: className = '',
		strokeWidth = 2,
		strokeLinecap = 'round',
		strokeLinejoin = 'round',
		stroke = 'black',
		duration = 1500
	}: {
		class?: string | string[];
		strokeWidth?: number;
		strokeLinecap?: 'round' | 'inherit' | 'butt' | 'square' | null | undefined;
		strokeLinejoin?:
			'round' | 'inherit' | 'arcs' | 'miter-clip' | 'miter' | 'bevel' | null | undefined;
		stroke?: string | null | undefined;
		duration?: number;
	} = $props();

	let container: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!container) return;
		const paths = container.querySelectorAll('path');
		const delays = [0, duration / 2, (duration * 3) / 4];
		const durations = [duration / 2, duration / 4, duration / 4];
		paths.forEach((path, index) => {
			const length = path.getTotalLength();
			path.style.strokeDasharray = length.toString();
			path.style.strokeDashoffset = length.toString();
			setTimeout(() => {
				requestAnimationFrame(() => {
					path.style.transition = `stroke-dashoffset ${durations[index]}ms ease-in-out`;
					path.style.strokeDashoffset = '0';
				});
			}, delays[index]);
		});
	});
</script>

<div bind:this={container} class={[className].flat()}>
	<svg
		viewBox="0 0 220 300"
		width="100%"
		height="100%"
		preserveAspectRatio="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M 200,50 c -30,100 -90,100 -100,100 c -30,0 -40,-50 0,-50 c 40,0 30,80 -90,80"
			fill="none"
			{stroke}
			stroke-width={strokeWidth}
			stroke-linecap={strokeLinecap}
			stroke-linejoin={strokeLinejoin}
		/>
		<path
			d="M 10,180 l 20,10"
			fill="none"
			{stroke}
			stroke-width={strokeWidth}
			stroke-linecap={strokeLinecap}
			stroke-linejoin={strokeLinejoin}
		/>
		<path
			d="M 10,180 l 20,-10"
			fill="none"
			{stroke}
			stroke-width={strokeWidth}
			stroke-linecap={strokeLinecap}
			stroke-linejoin={strokeLinejoin}
		/>
	</svg>
</div>
