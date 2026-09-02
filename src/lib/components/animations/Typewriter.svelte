<script lang="ts">
	import { gsap } from 'gsap';

	let {
		text,
		speed = 0.05,
		startDelay = 0,
		deleteSpeed = 0.03,
		deleteDelay = 1,
		loop = false,
		pauseBetween = 1,
		textClass,
		class: className,
		start = false,
		showCaret = true,
		onComplete,
		onDeleteComplete
	}: {
		text: string;
		speed?: number;
		startDelay?: number;
		deleteSpeed?: number;
		deleteDelay?: number;
		loop?: boolean;
		pauseBetween?: number;
		textClass?: string | string[];
		class?: string | string[];
		start?: boolean;
		showCaret?: boolean;
		onComplete?: () => void;
		onDeleteComplete?: () => void;
	} = $props();

	let displayText = $state('');
	let tween: gsap.core.Tween | undefined;

	$effect(() => {
		// Reduced-motion users get the full text instantly, no blinking caret.
		// Only the active typewriter shows text — the three are stacked.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			displayText = start ? text : '';
			return;
		}

		let active = true;
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		const runAnimation = (phase: 'typing' | 'deleting') => {
			if (!active) return;

			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = undefined;
			}

			const totalChars = text.length;
			if (totalChars === 0) return;

			const isTyping = phase === 'typing';
			const startVal = isTyping ? 0 : totalChars;
			const endVal = isTyping ? totalChars : 0;
			const duration = isTyping ? totalChars * speed : totalChars * deleteSpeed;
			const delay = isTyping ? startDelay : deleteDelay;

			tween?.kill();

			const obj = { val: startVal };
			displayText = text.slice(0, startVal);

			tween = gsap.to(obj, {
				val: endVal,
				duration,
				delay,
				ease: 'none',
				onUpdate: () => {
					displayText = text.slice(0, Math.floor(obj.val));
				},
				onComplete: () => {
					if (!active) return;

					displayText = text.slice(0, endVal);
					if (isTyping) {
						onComplete?.();
						if (loop) {
							timeoutId = setTimeout(() => {
								if (active) runAnimation('deleting');
							}, deleteDelay * 1000);
						}
					} else {
						onDeleteComplete?.();
						if (loop) {
							timeoutId = setTimeout(() => {
								if (active) runAnimation('typing');
							}, pauseBetween * 1000);
						}
					}
				}
			});
		};

		if (!start) {
			tween?.kill();
			tween = undefined;
			displayText = '';
			if (timeoutId) clearTimeout(timeoutId);
			return;
		}

		runAnimation('typing');

		return () => {
			active = false;
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = undefined;
			}
			tween?.kill();
			tween = undefined;
		};
	});
</script>

<div class={[className, ''].flat()}>
	<span class={[textClass, ''].flat()}>{displayText}</span>
	{#if showCaret}
		<span class="caret" aria-hidden="true"></span>
	{/if}
</div>

<style>
	.caret {
		display: inline-block;
		width: 1ch;
		height: 1.5em;
		vertical-align: text-bottom;
		background: var(--color-accent);
		animation: blink 1s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.caret {
			animation: none;
		}
	}
</style>
