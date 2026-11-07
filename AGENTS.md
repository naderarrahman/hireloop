<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop

Job board app: Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui on Base UI, Better Auth + MongoDB.

## Commands

- Use npm; only `package-lock.json` is present.
- `npm run dev`, `npm run build`, `npm start`.
- Verify changes with `npm run lint && npm run typecheck`. Both pass on a clean checkout; there is no test runner.
- Format only the files you changed: `npx prettier --write <files>`. `npm run format` rewrites every `.ts/.tsx`, and most existing files already fail `prettier --check`, so it creates a large unrelated diff.
- Formatting is Prettier with no semicolons, double quotes, LF, 2-space indent, 80 columns, and Tailwind class sorting via `prettier-plugin-tailwindcss` using `app/globals.css`.

## Where things live

- `app/layout.tsx` is the root shell (Geist fonts, `ThemeProvider`, `Navbar`). `app/page.tsx` renders `components/Home/Hero.tsx`.
- `app/api/auth/[...all]/route.ts` is the single Better Auth catch-all for `/api/auth/*` via `toNextJsHandler`. Add auth endpoints through Better Auth config, not new route files.
- `lib/auth.ts` is server auth: MongoDB database `hireloop`, email/password + Google. `lib/auth-client.ts` is the browser client.
- `components/ui/` is shadcn output; `components/layout/` and `components/Home/` are app components.
- `@/*` maps to the repo root, e.g. `@/lib/utils`, `@/components/...`.

## Repo-specific gotchas

- `lib/utils.ts` only re-exports `cn` from the third-party `cn` package; it is not the usual clsx/tailwind-merge helper.
- shadcn is configured for `base-nova` with `@base-ui/react`, not Radix. Use `npx shadcn@latest add <component>` rather than adapting Radix examples by hand.
- Tailwind v4 is CSS-first: theme tokens live in `app/globals.css`; there is no `tailwind.config.*`.
- `.env` is gitignored and needs `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `CLIENT_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`; auth fails at runtime without the Mongo/Google values.
- Next only exposes `NEXT_PUBLIC_*` variables to browser code. `lib/auth-client.ts` reads unprefixed `CLIENT_URL`, so it is undefined client-side unless exposed another way; verify before relying on it.
- UI is dark-first: the root body hardcodes `bg-black text-white`; `ThemeProvider` defaults to dark and binds `d` to toggle the theme.

## Next.js 16 specifics

- Read the version-matched docs in `node_modules/next/dist/docs/` before changing framework code; APIs differ from older Next.js knowledge.
- Turbopack is the default for both `next dev` and `next build`; do not add `--turbopack`.
- Request APIs are async-only: `await params`, `await searchParams`, `await cookies()`, `await headers()`, `await draftMode()`.
- `middleware.ts` is deprecated in favor of `proxy.ts` (Node runtime). `next lint` is removed; lint runs as plain `eslint` with flat config.
- `next dev` and `next build` use separate output dirs (`.next/dev`), and a lockfile prevents two `next dev`/`next build` instances in the same project.
