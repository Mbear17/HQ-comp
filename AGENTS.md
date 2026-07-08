# AGENTS.md

## Project Type
VitePress documentation site for "慧泉软件组件库" (HuiQuan Software Component Library) — a Chinese-language component documentation wiki.

## Commands
- `npm run docs:dev` — Start dev server with host access
- `npm run docs:build` — Build production site
- `npm run docs:preview` — Preview production build

No lint, typecheck, or test scripts exist.

## Structure
- `docs/` — All content lives here
- `docs/.vitepress/config.mts` — Site config (nav, sidebar, search, locale)
- `docs/comp/` — Component documentation pages
- `docs/comp/block/` — "积木组件" (building block components) — ins-def-* pattern
- `docs/.vitepress/dist/` — Build output (committed; serves as deployment artifact)

## Conventions
- All content is in **Chinese (zh-CN)**
- Component docs follow a pattern: title, tip block explaining dev URL, deployed schools table, framework API calls, module list table linking to block sub-pages
- Dev URLs use `WebRoot/saap/` prefix for component paths
- VitePress `base: '/dist/'` — site is deployed under `/dist/` subdirectory

## Adding Documentation
1. Create `.md` file in appropriate `docs/comp/` subdirectory
2. Add sidebar entry in `docs/.vitepress/config.mts` under `themeConfig.sidebar`
3. Add nav entry if it's a new category
4. Run `npm run docs:build` to update `docs/.vitepress/dist/`

## Gotchas
- Build output (`docs/.vitepress/dist/`) is tracked — rebuild after content changes
- No git repo initialized — no pre-commit hooks or CI
- VitePress version is alpha (`^2.0.0-alpha.16`)
