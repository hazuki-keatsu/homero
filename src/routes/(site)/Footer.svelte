<script>
	import Link from '$lib/components/Link.svelte';
	import { site } from '$lib/site';
	import { Mail } from '@lucide/svelte';
	import { SIIcon } from '@willingtonortiz/svelte-simple-icons';
	import { siBilibili, siGithub } from 'simple-icons';
</script>

<footer class="flex w-full flex-col items-center">
	<div class="mb-2 flex gap-6">
		<a
			class="my-2 flex items-center justify-center rounded-sm text-muted-foreground transition duration-300"
			href={site.socialLink.github}
			aria-label="Github"
			title="Github"
			target="_blank"
			rel="noopener noreferrer external"
		>
			<SIIcon class="text-foreground" icon={siGithub} />
		</a>
		<a
			class="my-2 flex items-center justify-center rounded-sm text-muted-foreground transition duration-300"
			href={site.socialLink.bilibili}
			aria-label="Bilibili"
			title="Bilibili"
			target="_blank"
			rel="noopener noreferrer external"
		>
			<SIIcon class="text-foreground" icon={siBilibili} />
		</a>
		<a
			class="my-2 flex items-center justify-center rounded-sm text-muted-foreground transition duration-300"
			href={site.socialLink.email}
			aria-label="Email"
			title="Email"
			rel="external"
		>
			<Mail class="text-foreground" />
		</a>
	</div>
	<div class="mb-4 flex">
		<span style:padding-right="0.3em">Code by</span><Link href="#">Hazuki Keatsu</Link>
	</div>
</footer>
