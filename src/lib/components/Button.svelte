<script lang="ts">
	let {
		text,
		onclick,
		class: className = '',
		...rest
	}: {
		text: string;
		onclick?: () => void;
		class?: string;
		[key: string]: unknown;
	} = $props();
</script>

<button
	type="button"
	class="bg-bg-card text-text-primary hover:bg-hover-bg {className}"
	{...rest}
	{onclick}
>
	{text}
</button>
