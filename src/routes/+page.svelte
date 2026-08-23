<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Button class="text-2xl" id="theme-btn">switch theme</Button>

<Button class="text-2xl" disable={true}>disabled</Button>
