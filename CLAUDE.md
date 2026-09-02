# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

homero is the personal site of 叶月枫 (Hazuki, domain keatsu.top): SvelteKit 5 (runes forced) + Tailwind CSS v4 + mdsvex, planned as a fully static Vercel deployment. Single-language English content at `/`.

## Commands

- `pnpm dev` — dev server
- `pnpm build` — production build (currently `adapter-auto`; static Vercel deployment is the plan — swap to `@sveltejs/adapter-static` when landing it)
- `pnpm preview` — preview production build
- `pnpm check` — `svelte-kit sync` + `svelte-check` type checking
- `pnpm lint` — `prettier --check .` + `eslint .`
- `pnpm format` — `prettier --write .`
- `pnpm prepare` — `svelte-kit sync`; also runs automatically on install

No test framework is set up.

## Architecture

### Config lives in vite.config.ts — there is no svelte.config.js

Adapter, mdsvex preprocess (extensions, layout), and forced-runes compiler option are all configured there. Svelte 5 runes mode is enforced for everything except `node_modules`.

### Static rendering

- `src/routes/+layout.ts` declares `prerender = true` for the whole site. It must live in the `.ts` file — declaring it in a `+layout.svelte` module script is silently ignored (SvelteKit warns).
- The home page lives at `src/routes/(site)/+page.svelte`, composed from the co-located `Hero.svelte` / `Self.svelte` / `Projects.svelte` / `Footer.svelte`; the `(site)` group layout renders the shell (Header with anchor nav + theme toggle).

### Language

- Single-language site, no i18n handling anywhere. `<html lang="en">` is set literally in `src/app.html`.
- `src/lib/site.ts` — site metadata (name, origin, description string, social links).

### Theme system — single source of truth is CSS

- `src/styles/theme.css`: `:root` holds the dark palette, `[data-theme='light']` overrides it. Tailwind v4 tokens are mapped to these vars via `@theme inline` (consumed through `src/routes/layout.css`, the single Tailwind entry: `@import 'tailwindcss'` + theme/global imports + typography plugin). Don't introduce color tokens elsewhere.
- `--tw-prose-*` (typography plugin) overrides are also in theme.css, scoped as `.prose` descendant selectors — the plugin declares its vars on `:where(.prose)`, so a bare `:root` block would be shadowed by the element-level declarations.
- Anti-FOUC: inline script in `src/app.html` sets `data-theme` + `window.__theme` before first paint. `src/lib/utils/theme.svelte.ts` — a Svelte runes module (`$state` at module scope) — reads `window.__theme` in `initTheme()` to avoid double-detection, persists to localStorage, and mirrors `prefers-color-scheme` changes.
- **theme.svelte.ts must not touch the DOM at module scope** — SSR executes the module; all DOM operations happen inside `initTheme()`/`persist()` (see the comment at the top of the file).
- Components call `switchTheme()`/`toggleTheme()` directly. Do **not** wire clicks through `document`-level event delegation with `closest()`: Button's `{#key}` animation destroys the clicked node mid-dispatch, so `closest()` on the already-detached target fails and the first click is swallowed.

### mdsvex (in vite.config.ts)

- The layout path must be absolute from the config file: `join(import.meta.dirname, 'src/lib/layouts/MDLayout.svelte')`. `$lib/` or `./src/` forms fail.
- `layoutPropForwarding: 'runes'` is required — the legacy default fails to compile under forced runes.
- Layout contract (`src/lib/layouts/MDLayout.svelte`): frontmatter keys are spread in as props, markdown renders into the default `Snippet`. It emits the SEO head (title, description, canonical — currently the bare origin, see TODO in file, OG, Twitter) and wraps content in `.prose`. No hreflang alternates.
- rehype-slug + rehype-autolink-headings inject empty anchor links; the `#` glyph is drawn with CSS in `src/styles/global.css` so heading `textContent` stays clean. Also in global.css: heading anchor scroll-margin-top clears the sticky header.

### Components (src/lib/components/)

- `Link.svelte` — underline-draw animation driven by a phase state machine (`idle/entering/entered/leaving`); routes internal hrefs through `resolve()`.
- `Button.svelte` — wipe-fill animation on click, disabled-aware.
- `Switcher.svelte` — toggle switch (used as the theme switcher).
- `Header.svelte` — sticky bar; logo, anchor nav to `#hero` / `#self` / `#projects`, theme toggle.

### SEO

- `src/routes/sitemap.xml/+server.ts` prerenders a sitemap with a single url for the origin root; `static/robots.txt` points at it.
- `src/routes/+error.svelte` is the 404 fallback (client-rendered after hydration; static `error.html` is a future TODO).

## Known pitfalls

- Navigation targets that are pure `#anchor` fragments skip `resolve()` entirely (see `finalHref`) and assume a single-page structure — if real subpages are added later, section links must become e.g. `/#hero` through `resolve()`.
- ESLint rule `svelte/no-navigation-without-resolve` requires navigation to go through `resolve()`.
- Local fonts (`src/lib/assets/fonts/`, HarmonyOS Sans SC, 6 weights) are uncompressed TTFs ~8 MB each — converting to woff2 is a known TODO.
