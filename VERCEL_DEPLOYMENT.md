# Deploying the Site to Vercel

This is a standard Next.js (App Router) app, so Vercel needs zero
configuration beyond environment variables. The admin panel (Sanity Studio)
is embedded in this same app at a secret URL — see the last section — so it
deploys automatically with everything else; there's nothing separate to set
up for it.

## 1. Push the repo to GitHub

Vercel deploys from a Git repository. If this repo isn't on GitHub (or
GitLab/Bitbucket) yet, push it there first.

## 2. Import the project

1. Go to [vercel.com/new](https://vercel.com/new) and sign in.
2. Import this repository.
3. Vercel auto-detects **Next.js** as the framework — leave the build
   command (`next build`, via `npm run build`), output, and install command
   on their defaults. No root directory change is needed.

## 3. Set environment variables

Before the first deploy (or in **Project Settings → Environment Variables**
afterwards), add these — same values as your local `.env`:

| Name | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `x2z5b5vj` | public, safe to expose |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | public |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | public |
| `NEXT_PUBLIC_SHEETS_WEBAPP_URL` | your Apps Script Web App URL | see `GOOGLE_SHEETS_SETUP.md` |
| `STUDIO_ACCESS_PATH` | a long random string, e.g. `abarnaa-cms-<random hex>` | **secret** — this is your admin panel's URL, keep it out of code/PRs |

Set them for all three environments (Production, Preview, Development).
`SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` are only read by the
standalone Sanity CLI (`npm run studio`, for local schema editing) — they're
not needed on Vercel.

Any change to environment variables requires a redeploy to take effect —
`NEXT_PUBLIC_*` values are baked into the client build, and `STUDIO_ACCESS_PATH`
is resolved at build time too (the Studio route is statically generated).
Use a **different** `STUDIO_ACCESS_PATH` in Production than the one you use
locally, so your local `.env` leaking doesn't expose the live admin panel.

## 4. Deploy

Click **Deploy**. Vercel builds and deploys automatically; subsequent pushes
to the connected branch redeploy automatically, and PRs get their own
preview URLs.

Prefer the CLI instead of the dashboard? `npx vercel` (preview) and
`npx vercel --prod` (production) from the project root work the same way,
once you've run `npx vercel link` to connect it to a Vercel project.

## 5. Allow the deployed domain in Sanity (CORS)

The site fetches content client-side, so Sanity must allow the deployed
origin(s) or requests will silently fail and the site will fall back to the
static defaults in `src/data.ts` (see the CORS section of
`SANITY_SETUP.md`). This also covers the embedded admin panel, since it
runs from the same origin.

In [sanity.io/manage](https://sanity.io/manage) → your project → **API** →
**CORS origins**, add:

- Your production domain, e.g. `https://abarnaa-tailoring-mart.vercel.app`
  (and any custom domain you attach in Vercel) — check "Allow credentials"
  too, since the Studio's own login needs it (the public site's read-only
  fetches don't).

Preview deployments get a unique, per-deploy `*.vercel.app` URL, so they
can't all be pre-registered. If you need live Sanity content (or admin
access) on preview deployments too, either add each preview URL as you go,
or set up a stable preview domain via Vercel's Git branch domains
(**Project Settings → Domains**) and register that one instead.

## 6. Custom domain (optional)

**Project Settings → Domains** → add your domain and follow Vercel's DNS
instructions. Once it's live, add it to the Sanity CORS origins list too
(step 5) and update `NEXT_PUBLIC_*`-derived metadata if you want absolute
Open Graph/Twitter image URLs (`metadataBase` in `src/app/layout.tsx`).

## About the admin panel (embedded Sanity Studio)

Once deployed, reach it at `https://<your-domain>/<STUDIO_ACCESS_PATH>` —
the exact value you set in step 3. It's not linked from anywhere on the
site and the underlying route rejects direct requests (see
`SANITY_SETUP.md` → "The admin panel's secret URL" for how that works and
why it's obscurity, not a replacement for Sanity's own login).

Bookmark the URL somewhere private (a password manager, not a public wiki)
— there's no "forgot my admin URL" recovery beyond re-reading the
`STUDIO_ACCESS_PATH` value from Vercel's env var settings.
