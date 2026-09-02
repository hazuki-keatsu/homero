<script lang="ts">
	import { Menu, X } from '@lucide/svelte';

	let { open, onclick, controls }: {
		open: boolean;
		onclick: () => void;
		controls?: string;
	} = $props();

	let label = $derived(open ? 'Close the menu' : 'Open the menu');
</script>

<button
	type="button"
	aria-label={label}
	title={label}
	aria-expanded={open}
	aria-controls={controls}
	class="flex size-9 overflow-hidden rounded-sm bg-card transition-colors hover:bg-muted"
	onclick={onclick}
>
	<span class="track" class:open>
		<span class="slot"><Menu size={18} strokeWidth={1.75} /></span>
		<span class="slot"><X size={18} strokeWidth={1.75} /></span>
	</span>
</button>

<style>
	button .track {
		display: flex;
		width: 72px;
		transform: translateX(0);
		transition: transform 0.25s ease;
	}

	button .track.open {
		transform: translateX(-36px);
	}

	button .slot {
		display: flex;
		width: 36px;
		height: 36px;
		align-items: center;
		justify-content: center;
	}
</style>
