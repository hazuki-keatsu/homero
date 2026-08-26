<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		onclick,
		disabled,
		class: className = '',
		...rest
	}: {
		children: Snippet;
		onclick?: () => void;
		disabled?: boolean;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let animation = $state(false);

	function handleClick() {
		if (disabled) return;
		animation = true;
		onclick?.();
	}

	function onAnimationEnd(e: AnimationEvent) {
		// Svelte will add hash to animation name
		if (!e.animationName.endsWith('wipe')) return;
		animation = false;
	}
</script>

<button
	type="button"
	{...rest}
	class="rounded-sm bg-card px-2 py-1 text-left {className}"
	onclick={handleClick}
	{disabled}
>
	{#key animation}
		<span class="bg-card-foreground" class:anim={animation} onanimationend={onAnimationEnd}>
			{@render children()}
		</span>
	{/key}
</button>

<style>
	button {
		--slider-height: 100%;
	}

	button span {
		position: relative;
		display: inline-block;
		background: linear-gradient(var(--color-foreground), var(--color-foreground)) no-repeat;
		background-size: 0 var(--slider-height);
		background-position: left bottom;
	}

	button span.anim {
		animation: wipe 1s;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	button:disabled span {
		color: var(--color-muted-foreground);
	}

	@keyframes wipe {
		0% {
			background-size: 0 var(--slider-height);
			background-position: left bottom;
			animation-timing-function: ease;
		}
		50% {
			background-size: 100% var(--slider-height);
			background-position: left bottom;
			animation-timing-function: ease;
		}
		50.001% {
			background-size: 100% var(--slider-height);
			background-position: right bottom;
		}
		100% {
			background-size: 0 var(--slider-height);
			background-position: right bottom;
		}
	}
</style>
