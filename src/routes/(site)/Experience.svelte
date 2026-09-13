<script lang="ts">
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';

	type Experience = {
		marker: string;
		date?: string;
		kind: string;
		title: string;
		summary: string;
		highlights: string[];
		side: 'left' | 'right';
	};

	const experiences: Experience[] = [
		{
			marker: '01',
			date: '24-09-01',
			kind: 'Education',
			title: 'Software Engineering at XDU',
			summary: 'Even though there are some regrets, I still welcomed a brand new beginning.',
			highlights: ['Software Engineering'],
			side: 'left'
		},
		{
			marker: '02',
			date: '25-10-12',
			kind: 'Practice',
			title: 'Participate into FOSS',
			summary:
				'Collaborating on XDYou, an open-source utility that makes everyday campus information easier to reach.',
			highlights: ['Flutter'],
			side: 'right'
		},
		{
			marker: 'NOW',
			kind: 'Exploration',
			title: 'Compiler',
			summary: 'Exploring the boundary between language design and systems programming.',
			highlights: ['Rust', 'LLVM'],
			side: 'left'
		}
	];
</script>

<section id="experience" class="experience-section relative overflow-hidden py-24 sm:py-32">
	<div aria-hidden="true" class="experience-glow pointer-events-none absolute inset-0"></div>

	<div class="relative mx-auto max-w-5xl px-6">
		<ScrollReveal class="max-w-2xl" y={24} duration={0.7}>
			<p class="font-mono text-xs font-semibold tracking-[0.2em] text-accent uppercase">
				Selected path
			</p>
			<h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Experience</h2>
			<p class="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
				A work-in-progress record of things I am conducting.
			</p>
		</ScrollReveal>

		<div class="relative mt-14 md:mt-18">
			<div
				aria-hidden="true"
				class="absolute top-3 bottom-3 left-4 w-px bg-border md:left-1/2"
			></div>

			<ol class="space-y-10 md:space-y-0">
				{#each experiences as experience, index (experience.marker)}
					<li class="relative grid grid-cols-[2rem_1fr] gap-x-5 md:grid-cols-2 md:gap-x-12">
						<div
							aria-hidden="true"
							class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent bg-background font-mono text-[10px] font-bold text-accent md:absolute md:top-7 md:left-1/2 md:-translate-x-1/2"
						>
							{experience.marker}
						</div>

						{#if experience.date}
							<time
								class={[
									'hidden font-mono text-sm font-semibold tracking-wide text-muted-foreground md:row-start-1 md:mt-7 md:flex md:h-8 md:items-center',
									experience.side === 'right' ? 'md:col-start-1 md:justify-end' : 'md:col-start-2'
								]}
								datetime={experience.date}
							>
								{experience.date}
							</time>
						{/if}

						<ScrollReveal
							class={[
								'min-w-0 md:row-start-1',
								experience.side === 'right' ? 'md:col-start-2' : 'md:col-start-1 md:text-right'
							]}
							y={40}
							delay={index * 0.12}
							duration={0.7}
						>
							<article
								class="experience-entry rounded-2xl border border-border bg-card/35 p-5 sm:p-6"
							>
								<div class="flex items-center justify-between gap-4">
									<p class="font-mono text-xs tracking-widest text-accent uppercase">
										{experience.kind}
									</p>
									{#if experience.date}
										<time
											class="font-mono text-xs text-muted-foreground md:hidden"
											datetime={experience.date}
										>
											{experience.date}
										</time>
									{/if}
								</div>
								<h3 class="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
									{experience.title}
								</h3>
								<p class="mt-3 leading-relaxed text-muted-foreground">{experience.summary}</p>
								<ul
									class="mt-5 flex flex-wrap gap-2 {experience.side === 'right'
										? ''
										: 'md:justify-end'}"
								>
									{#each experience.highlights as highlight (highlight)}
										<li
											class="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
										>
											{highlight}
										</li>
									{/each}
								</ul>
							</article>
						</ScrollReveal>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.experience-section {
		background: linear-gradient(
			180deg,
			transparent,
			color-mix(in oklab, var(--color-card) 32%, transparent),
			transparent
		);
	}

	.experience-glow {
		background:
			radial-gradient(
				circle at 50% 42%,
				color-mix(in oklab, var(--color-accent) 12%, transparent),
				transparent 34%
			),
			linear-gradient(90deg, transparent 49.9%, var(--color-border) 50%, transparent 50.1%);
		mask-image: linear-gradient(to bottom, transparent, black 14%, black 86%, transparent);
	}

	.experience-entry {
		transition:
			border-color 220ms ease,
			transform 220ms ease,
			background-color 220ms ease;
	}

	.experience-entry:hover {
		border-color: color-mix(in oklab, var(--color-accent) 65%, var(--color-border));
		background-color: color-mix(in oklab, var(--color-card) 72%, transparent);
	}

	@media (max-width: 767px) {
		.experience-glow {
			background: radial-gradient(
				circle at 12% 42%,
				color-mix(in oklab, var(--color-accent) 10%, transparent),
				transparent 35%
			);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.experience-entry {
			transition: none;
		}
	}
</style>
