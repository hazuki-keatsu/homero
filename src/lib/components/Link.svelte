<script lang="ts">
	import { finalHref } from '$lib/utils/finalHref';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		children,
		href,
		disabled = false,
		noUnderlined = false,
		...rest
	}: {
		class?: string | string[];
		children: Snippet;
		href: string;
		disabled?: boolean;
		noUnderlined?: boolean;
		[key: string]: unknown;
	} = $props();

	type Phase = 'idle' | 'entering' | 'entered' | 'leaving';
	let phase = $state<Phase>('idle');
	let pendingLeave = $state(false);

	function onMouseEnter() {
		if (disabled) return;
		if (phase === 'idle') {
			phase = 'entering';
		} else if (phase === 'leaving') {
			phase = 'entering';
			pendingLeave = false;
		}
	}

	function onMouseLeave() {
		if (disabled) return;
		if (phase === 'entered') {
			phase = 'leaving';
		} else if (phase === 'entering') {
			pendingLeave = true;
		}
	}

	function onAnimationEnd(event: AnimationEvent) {
		const name = event.animationName;
		// Svelte adds a hash suffix to scoped keyframe names — match by suffix
		if (name.endsWith('underlined') && phase === 'entering') {
			if (pendingLeave) {
				pendingLeave = false;
				phase = 'leaving';
			} else {
				phase = 'entered';
			}
		} else if (name.endsWith('erased') && phase === 'leaving') {
			phase = 'idle';
		}
	}

	const baseClasses = $derived(
		[
			className,
			disabled && 'pointer-events-none opacity-50 text-muted-foreground',
			!disabled && 'text-foreground'
		].flat()
	);

	const animationClass = $derived(
		phase === 'entering'
			? 'anim-enter'
			: phase === 'entered'
				? 'anim-entered'
				: phase === 'leaving'
					? 'anim-leave'
					: ''
	);
</script>

<div
	role="presentation"
	class={baseClasses}
	onmouseenter={noUnderlined ? undefined : onMouseEnter}
	onmouseleave={noUnderlined ? undefined : onMouseLeave}
	onanimationend={noUnderlined ? undefined : onAnimationEnd}
>
	<a
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		href={disabled ? undefined : finalHref(href)}
		tabindex={disabled ? -1 : undefined}
		aria-disabled={disabled || undefined}
		{...rest}
		class={animationClass}
		class:enabled={!disabled}
	>
		{@render children()}
	</a>
</div>

<style>
	a {
		--underline-stroke: 1px;
	}

	.enabled {
		background: linear-gradient(var(--color-foreground), var(--color-foreground)) no-repeat;
		background-size: 0 var(--underline-stroke);
		background-position: left bottom;
	}

	.anim-enter {
		animation: underlined 0.5s ease forwards;
	}

	.anim-entered {
		background-size: 100% var(--underline-stroke);
	}

	.anim-leave {
		animation: erased 0.5s ease forwards;
	}

	@keyframes underlined {
		0% {
			background-size: 0 var(--underline-stroke);
			background-position: left bottom;
		}
		100% {
			background-size: 100% var(--underline-stroke);
			background-position: left bottom;
		}
	}

	@keyframes erased {
		0% {
			background-size: 100% var(--underline-stroke);
			background-position: right bottom;
		}
		100% {
			background-size: 0 var(--underline-stroke);
			background-position: right bottom;
		}
	}
</style>
