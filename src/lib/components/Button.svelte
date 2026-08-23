<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		onclick,
		disable,
		class: className = '',
		...rest
	}: {
		children: Snippet;
		onclick?: () => void;
		disable?: boolean;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let animation = $state(false);

	function handleClick() {
		if (disable) return;
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
	class="bg-card p-2 text-foreground {className}"
	onclick={handleClick}
	disabled={disable}
>
	{#key animation}
		<span class:anim={animation} onanimationend={onAnimationEnd}>
			{@render children()}
		</span>
	{/key}
</button>

<style>
	button {
		--slider-height: 100%;
		--cursor-width: 0.7ch;
		--cursor-left-gap: 1px;
	}

	button span {
		position: relative;
		display: inline-block;
		padding-left: calc(var(--cursor-width) + var(--cursor-left-gap));
		background: linear-gradient(var(--color-foreground), var(--color-foreground)) no-repeat;
		background-size: 0 var(--slider-height);
		background-position: left bottom;
	}

	button span::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: var(--cursor-width);
		height: var(--slider-height);
		background-color: var(--color-foreground);
		opacity: 1;
	}

	button span.anim {
		animation: wipe 1s;
	}

	button:hover span::before {
		animation: blink 1s infinite;
	}

	button:hover span.anim::before {
		animation: none;
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

	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
