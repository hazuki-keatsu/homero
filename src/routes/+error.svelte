<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<main class="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
	<h1 class="text-4xl font-medium text-foreground">{page.status ?? 404}</h1>
	<p class="text-muted-foreground">Not found</p>
	<a href={resolve('/')} class="text-foreground">Home</a>
</main>
