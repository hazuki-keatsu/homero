<script lang="ts">
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { finalHref } from '$lib/utils/finalHref';
	import {
		siFlutter,
		siGithub,
		siKotlin,
		siRust,
		siSvelte,
		siSwift,
		type SimpleIcon
	} from 'simple-icons';
	import Badge from '$lib/components/Badge.svelte';
	import { SIIcon } from '@willingtonortiz/svelte-simple-icons';
	import { Link } from '@lucide/svelte';

	type Project = {
		name: string;
		description: string;
		stack: { text: string; color: string; icon: SimpleIcon }[];
		github?: string;
		link?: string;
		role: 'Owner' | 'Cooperator' | 'Contributor';
	};

	const projects: Project[] = [
		{
			name: 'XDYou',
			description:
				'An open-source student information lookup software for XDU students, including features like class schedule check, grade check, and electricity bill check.',
			stack: [
				{ text: 'Flutter', color: siFlutter.hex, icon: siFlutter },
				{ text: 'Swift', color: siSwift.hex, icon: siSwift },
				{ text: 'Kotlin', color: siKotlin.hex, icon: siKotlin }
			],
			github: 'https://github.com/BenderBlog/traintime_pda',
			link: 'https://xdyou.superbart.top/',
			role: 'Cooperator'
		},
		{
			name: 'Corgi',
			description:
				'Corgi is a language centered around explicit allocators. It does away with garbage collection and borrow checking, while keeping C-level performance, and offers a Go-like easy-to-read concurrency model with type safety. Still in developing...',
			stack: [{ text: 'Rust', color: siRust.hex, icon: siRust }],
			role: 'Owner'
		},
		{
			name: 'Homero',
			description:
				'The home page template with minimalism which is the website you are browsing. And the blog renderer based on Markdown is integrated into the template.',
			stack: [{ text: 'Svelte', color: siSvelte.hex, icon: siSvelte }],
			github: 'https://github.com/hazuki-keatsu/homero',
			role: 'Owner'
		}
	];
</script>

{#snippet projectRow(project: Project, index: number)}
	<div class="flex items-start gap-x-6 md:gap-x-10">
		<span
			class="w-8 shrink-0 pt-1 font-mono text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
		>
			{(index + 1).toString().padStart(2, '0')}
		</span>
		<div class="min-w-0 flex-1">
			<h3 class="flex items-center justify-between text-xl font-bold md:text-2xl">
				{project.name}
				<span
					class="ml-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold
    {project.role === 'Owner'
						? 'bg-emerald/10 text-emerald'
						: project.role === 'Cooperator'
							? 'bg-blue/10 text-blue'
							: 'bg-amber/10 text-amber'}"
				>
					{project.role}
				</span>
			</h3>
			<p class="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
				{project.description}
			</p>
			<div class="mt-3 grid grid-cols-[1fr_auto] items-center">
				<ul
					class="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground sm:text-sm"
				>
					{#each project.stack as tech (tech.text)}
						<li><Badge text={tech.text} color={tech.color} icon={tech.icon} /></li>
					{/each}
				</ul>
				<div class="flex gap-2">
					{#if project.github !== undefined}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={finalHref(project.github!)} target="_blank" rel="noopener noreferrer external"
							><SIIcon icon={siGithub} size={28} /></a
						>
					{/if}
					{#if project.link !== undefined}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a
							class="inline-flex items-center justify-center rounded-full bg-[#181717] p-1 text-white transition-colors"
							href={finalHref(project.link!)}
							target="_blank"
							rel="noopener noreferrer external"><Link size={20} strokeWidth={2.5} /></a
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/snippet}

<section
	id="projects"
	class="relative mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 py-24"
>
	<ScrollReveal class="w-full" y={24} duration={0.7}>
		<h2 class="mb-1 text-3xl font-bold sm:text-4xl">Projects</h2>
	</ScrollReveal>

	<ul class="mt-10 w-full divide-y divide-border">
		{#each projects as project, i (project.name)}
			<li>
				<ScrollReveal class="w-full" y={48} delay={i * 0.12} duration={0.7}>
					<div class="py-7 md:py-8">{@render projectRow(project, i)}</div>
				</ScrollReveal>
			</li>
		{/each}
	</ul>
</section>
