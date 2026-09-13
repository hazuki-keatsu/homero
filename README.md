# Homero

Hazuki Keatsu 的个人主页项目，使用 SvelteKit、Svelte 5 和 Tailwind CSS 4 构建。当前站点为单页英文网站，站点元信息配置在 [`src/lib/site.ts`](src/lib/site.ts)，页面入口位于 [`src/routes/(site)/+page.svelte`](<src/routes/(site)/+page.svelte>)。

## 当前状态

- 已实现首页的 Hero、个人介绍、经历、项目和页脚等区块。
- 已具备深浅色主题切换、响应式导航、基础 SEO、`robots.txt` 与站点地图。
- 全站在 [`src/routes/+layout.ts`](src/routes/+layout.ts) 中启用预渲染。
- 目前使用 `@sveltejs/adapter-auto`；尚未配置特定部署平台的 adapter。
- 暂未配置测试框架。

## Markdown 支持尚未完成

仓库安装了 `mdsvex`、`rehype-slug` 和 `rehype-autolink-headings`，但它们目前**没有启用**：

- [`vite.config.ts`](vite.config.ts) 中的 mdsvex 导入与 `preprocess` 配置均处于注释状态；
- 预期的 Markdown 布局 `src/lib/layouts/MDLayout.svelte` 尚不存在；
- 尚未提供 `.md` / `.svx` 内容文件、文章路由或列表页。

因此，尽管 Vite 配置声明了 `.md` 和 `.svx` 扩展名，当前项目并不具备可用的 Markdown 页面或博客渲染能力。启用该功能前，请不要将 Markdown 内容作为可访问页面发布。

## 本地开发

项目使用 pnpm：

```sh
pnpm install
pnpm dev
```

常用命令：

```sh
pnpm check    # Svelte / TypeScript 检查
pnpm lint     # Prettier 与 ESLint 检查
pnpm build    # 构建生产版本
pnpm preview  # 本地预览构建产物
```

## 项目结构

```text
src/
├── routes/             # 页面、布局与 sitemap 路由
│   └── (site)/          # 首页及其页面区块
├── lib/
│   ├── components/      # 可复用组件与动画
│   ├── assets/          # 图标和本地字体
│   └── site.ts          # 站点名称、域名与社交链接
└── styles/              # 全局样式、主题与排版
static/                  # 静态资源（头像、robots.txt）
```

## 技术栈

- SvelteKit 2 / Svelte 5
- Vite 8
- Tailwind CSS 4
- TypeScript
- pnpm
