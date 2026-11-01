# AGENTS.md

## Where the app lives
- The git root is `studio-frontend/`, but there is no `package.json` here — the app is `studio-app/`. Run all npm commands from `studio-app/`.
- A leftover root-level `package-lock.json` (with no root `package.json`) triggers a "multiple lockfiles detected" warning; Next.js resolves it away by pinning `turbopack.root` to `studio-app/`. The warning is harmless — don't "fix" it by moving lockfiles.

## Commands (run in `studio-app/`)
- `npm run dev` — Turbopack dev server; `npm run build` — full build + typecheck + lint (slow, allow 2–3 min); `npm run lint` — bare `eslint` with flat config; `npm start`.
- No test setup exists. `npm run build` is the verification step for any change.

## Next.js 16 — not your training data
- Next 16.4.3 with App Router, Turbopack, `cacheComponents` and `partialPrefetching` enabled in `next.config.ts` (Tailwind CSS is wired through `turbopack.rules`, there is no tailwind config file).
- Bundled docs: `studio-app/node_modules/next/dist/docs/` — read the relevant guide before writing Next-specific code (e.g. Cache Components, `params`/`searchParams` are Promises, typed routes).
- `studio-app/AGENTS.md` holds an auto-generated `<!-- BEGIN:nextjs-agent-rules -->` block written and re-added by `next dev` (generator: `node_modules/next/dist/server/lib/generate-agent-files.js`). Never hand-edit it; keep it committed.
- Pages/layouts use the Next-provided `PageProps` / `LayoutProps<"<route>">` global types (see `app/layout.tsx`) — don't re-declare prop types for them.

## Project conventions
- App Router only. A page = `app/<route>/page.tsx` with its own `metadata` export; shared section components sit in `app/components/`.
- One component per page section; sections reused across pages (e.g. `CreativeSpaces`) must stay portable — no page-specific deps/imports.
- `Navbar` takes an `active` prop (matches a link label) for the underline state; `ApertureLogo` is exported from it for pages without the navbar (auth pages).
- No icon packages are installed — icons are hand-rolled SVGs; shared auth icons live in `app/components/AuthIcons.tsx`.
- Path alias `@/*` exists, but the codebase consistently uses relative imports — follow the code.
- Never add code comments. ESLint enforces `react/no-unescaped-entities`: escape `'` as `'` or put text inside `{...}` expressions.
- StudioSpace dark/purple design system: backgrounds `#0b0a10` (home hero), `#131217` (navbar, sticky, `h-[72px]`), `#15111d` (about hero), `#0d0a14` (auth bg), card `#191324`, inputs `#241b33`; accent `text-purple-400`, buttons `bg-gradient-to-r from-purple-600 to-purple-500`. Page container: `mx-auto  px-6 sm:px-10 lg:px-14`. Every section/page must be responsive at default Tailwind breakpoints.
- Images are local stock downloads in `public/images/`; render with `next/image` (`fill` + `object-*` + `sizes` inside an absolutely positioned wrapper).
