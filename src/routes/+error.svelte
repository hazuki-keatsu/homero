<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<main class="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
	<h1 class="text-4xl font-medium text-foreground">{page.status ?? 404}</h1>
	<p class="text-muted-foreground">Not found / 页面不存在</p>
	<div class="flex gap-4">
		<a href={resolve('/zh-cn')} class="text-foreground">中文</a>
		<a href={resolve('/en')} class="text-foreground">English</a>
	</div>
</main>
