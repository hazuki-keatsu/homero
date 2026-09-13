<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';

	const sections = [
		{ id: 'hero', label: 'Hero' },
		{ id: 'self', label: 'About' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' }
	] as const;

	// The section currently at the top of the page — judged by which section's
	// top edge has crossed the top of the viewport (the last one wins).
	let activeId = $state<string | null>(null);

	$effect(() => {
		function update() {
			let found: string | null = null;
			for (const { id } of sections) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= 0) found = id;
			}
			activeId = found;
		}

		let raf = 0;
		const schedule = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});

	// Close the mobile menu on any anchor jump (hashchange) — clicking a menu
	// link triggers both its own onclick and this listener; the double close
	// is harmless.
	$effect(() => {
		const onHash = () => {
			menuOpen = false;
		};
		window.addEventListener('hashchange', onHash);
		return () => window.removeEventListener('hashchange', onHash);
	});

	// Escape closes the mobile menu while it is open.
	$effect(() => {
		if (!menuOpen) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') menuOpen = false;
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	let menuOpen = $state(false);
</script>

<header class="fixed inset-x-0 z-30 bg-card/50 backdrop-blur-md">
	<div
		class="flex items-center justify-between px-3 py-3 transition-[padding] md:px-6"
	>
		<Link noUnderlined={true} href="/" class="text-lg font-bold md:text-xl">Hazuki Keatsu</Link>
		<div class="flex items-center">
			<!-- md and up: inline links + theme toggle -->
			<div class="hidden items-center gap-6 md:flex">
				<nav class="flex items-center gap-6" aria-label="Site sections">
					{#each sections as { id, label } (id)}
						<Link
							href={`#${id}`}
							active={activeId === id}
							aria-current={activeId === id ? 'true' : undefined}
						>
							{label}
						</Link>
					{/each}
				</nav>
				<ThemeButton />
			</div>
			<!-- below md: everything collapses behind the menu button -->
			<div class="flex md:hidden">
				<MenuButton
					open={menuOpen}
					controls="mobile-menu"
					onclick={() => {
						menuOpen = !menuOpen;
					}}
				/>
			</div>
		</div>
	</div>

	<!-- Mobile panel: rendered as a seamless downward extension of the header
		bar (same surface, no rounding/border), grown via grid-template-rows so
		the collapse animates both ways without measuring content height. -->
	<div
		id="mobile-menu"
		class="grid transition-[grid-template-rows] duration-300 ease-out md:hidden"
		style:grid-template-rows={menuOpen ? '1fr' : '0fr'}
		inert={!menuOpen}
	>
		<div class="min-h-0 overflow-hidden">
			<div
				class="px-3 pb-3 transition-[opacity,transform] duration-300 ease-out {menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}"
			>
				<nav class="flex flex-col" aria-label="Site sections">
					{#each sections as { id, label } (id)}
						<Link
							href={`#${id}`}
							active={activeId === id}
							aria-current={activeId === id ? 'true' : undefined}
							onclick={() => {
								menuOpen = false;
							}}
							noUnderlined={true}
							class="[&_a]:block [&_a]:my-3 [&_a]:text-base [&_a]:transition-colors [&_a:hover]:bg-muted/60"
						>
							{label}
						</Link>
					{/each}
				</nav>
				<div class="mt-3 flex items-center gap-3 border-t border-border pt-3">
					<ThemeButton />
					<span class="text-sm text-muted-foreground">Theme</span>
				</div>
			</div>
		</div>
	</div>
</header>
