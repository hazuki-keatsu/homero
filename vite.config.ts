import { join } from 'node:path';
import { mdsvex } from 'mdsvex';
import type { MdsvexOptions } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					// Must be an absolute path from this file's location — mdsvex uses it for both
					// fs.readFileSync and the injected import; $lib/ or ./src/ forms fail.
					layout: join(import.meta.dirname, 'src/lib/layouts/MDLayout.svelte'),
					layoutPropForwarding: 'runes',
					// mdsvex 0.12 types `rehypePlugins` as unified's `Plugin<[], unist.Node, Node>`,
					// but rehype-slug 6 / rehype-autolink-headings 7 ship `Plugin<Options, hast.Root>`.
					// hast `Root` requires `children`, which unist `Node` lacks, so the generics can
					// never align — one explicit cast at the array boundary.
					rehypePlugins: [
						rehypeSlug,
						[
							rehypeAutolinkHeadings,
							{
								behavior: 'prepend',
								// Empty content: the `#` glyph is drawn with CSS so the heading
								// textContent (used by Memory.svelte) stays clean.
								content: { type: 'text', value: '' }
							}
						]
					] as unknown as NonNullable<MdsvexOptions['rehypePlugins']>
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
