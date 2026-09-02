<script lang="ts">
	import { finalHref } from "$lib/utils/finalHref";

	let {
		class: className = '',
		href,
		...rest
	}: {
		class?: string | string[];
		href: string;
		[key: string]: unknown;
	} = $props();

	
</script>

<div role="presentation" class={[className, 'py-2']}>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a href={finalHref(href)} class="text-xl" {...rest}> Scroll Down </a>
</div>

<style>
	a {
		background: linear-gradient(var(--color-foreground), var(--color-foreground)) no-repeat;
		animation: underlined 1s ease-in-out infinite;
	}

	@keyframes underlined {
		0% {
			background-size: 0 2px;
			background-position: left bottom;
		}
		50% {
			background-size: 100% 2px;
			background-position: left bottom;
		}
		50.001% {
			background-size: 100% 2px;
			background-position: right bottom;
		}
		100% {
			background-size: 0 2px;
			background-position: right bottom;
		}
	}
</style>
