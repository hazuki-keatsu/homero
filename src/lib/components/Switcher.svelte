<script lang="ts">
	let {
		checked = false,
		onchange,
		disabled,
		class: className = '',
		...rest
	}: {
		checked?: boolean;
		onchange?: (checked: boolean) => void;
		disabled?: boolean;
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<button
	type="button"
	role="switch"
	aria-checked={checked}
	{...rest}
	class="relative h-5 w-10 rounded-sm bg-muted {className}"
	class:on={checked}
	onclick={() => {
		onchange?.(!checked);
	}}
	{disabled}
>
	<span class:on={checked}></span>
</button>

<style>
	button {
		--slider-height: 100%;
		background-image: linear-gradient(var(--color-foreground), var(--color-foreground));
		background-repeat: no-repeat;
		background-size: 0 var(--slider-height);
		background-position: left bottom;
		transition: background-size 0.25s ease;
	}

	button.on {
		background-size: 100% var(--slider-height);
	}

	button span {
		position: absolute;
		top: 0.125rem;
		left: 0.125rem;
		width: 1rem;
		height: 1rem;
		border-radius: 0.125rem;
		background-color: var(--color-card);
		transition: translate 0.25s ease;
	}

	button.on span {
		translate: 1.25rem 0;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	button:disabled span {
		background-color: var(--color-muted-foreground);
	}
</style>
