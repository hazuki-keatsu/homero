<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	let {
		class: className = '',
		children,
		href,
		disabled = false,
		noUnderlined = false,
		...rest
	}: {
		class?: string;
		children: Snippet;
		href: string;
		disabled?: boolean;
		noUnderlined?: boolean;
		[key: string]: unknown;
	} = $props();

	const finalHref = $derived.by(() => {
		if (/^(https?:|mailto:|tel:|ftp:)/i.test(href) || href.startsWith('#')) {
			return href;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return resolve(href as any);
	});

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

	const baseClasses = $derived([
		className,
		'py-2 px-2',
		disabled && 'pointer-events-none opacity-50 text-muted-foreground',
		!disabled && 'text-foreground'
	]);

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
		href={disabled ? undefined : finalHref}
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
	.enabled {
		background: linear-gradient(var(--color-foreground), var(--color-foreground)) no-repeat;
		background-size: 0 2px;
		background-position: left bottom;
	}

	.anim-enter {
		animation: underlined 0.5s ease forwards;
	}

	.anim-entered {
		background-size: 100% 2px;
	}

	.anim-leave {
		animation: erased 0.5s ease forwards;
	}

	@keyframes underlined {
		0% {
			background-size: 0 2px;
			background-position: left bottom;
		}
		100% {
			background-size: 100% 2px;
			background-position: left bottom;
		}
	}

	@keyframes erased {
		0% {
			background-size: 100% 2px;
			background-position: right bottom;
		}
		100% {
			background-size: 0 2px;
			background-position: right bottom;
		}
	}
</style>
