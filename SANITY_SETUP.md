# Managing Site Content with Sanity

Four sections of the site — the blouse showcase, the sewing machine/spares
catalog, the Instagram grid, and the branches footer — are backed by a
[Sanity](https://www.sanity.io) project (`x2z5b5vj`, dataset `production`).
Content is edited through a Sanity Studio that lives in this repo.

If the Sanity dataset has no matching documents (or the site can't reach
Sanity), each section falls back to the static defaults in `src/data.ts`, so
the site always renders even before you've added any content.

## 1. Access the Studio

There are two ways to reach it — same content, same login, same schemas:

- **Embedded in the site (day-to-day / production use):** visit
  `http://localhost:3000/<STUDIO_ACCESS_PATH>` — the value of the
  `STUDIO_ACCESS_PATH` variable in your `.env`. This is a secret,
  unlisted URL; see "The admin panel's secret URL" below.
- **Standalone CLI Studio (fast local schema editing):**
  ```
  npm run studio
  ```
  opens the Studio at `http://localhost:3333` via a separate dev server —
  handy when you're iterating on `schemaTypes/` or `studio/` and don't want
  to rebuild the whole Next.js app for every change.

Both connect to project `x2z5b5vj` / dataset `production`. Sign in with a
Sanity account that's a member of the project — if you don't have access
yet, ask whoever created the project to invite you at
[sanity.io/manage](https://sanity.io/manage).

### The admin panel's secret URL

The embedded Studio lives at `/studio-internal` in the Next.js app, but
that path is never linked anywhere and `src/proxy.ts` rejects direct
requests to it outright (returns 404). The only way in is through whatever
random path you set as `STUDIO_ACCESS_PATH` in `.env` — the proxy silently
rewrites requests for that secret path to the real route.

This hides the entry point from casual discovery (search engines, link
scanners, guesswork) — it is **not** a substitute for Sanity's own login,
which is still what actually gates reading/writing data. Treat the value
like a password:

- Never commit a real value (`.env` is gitignored; `.env.example` only has
  a placeholder).
- Pick a long, random string — e.g. `abarnaa-cms-<random hex>`.
- On Vercel, set `STUDIO_ACCESS_PATH` as an environment variable (see
  `VERCEL_DEPLOYMENT.md`) rather than putting it in code.
- If it ever leaks, change the env var and redeploy — that immediately
  invalidates the old URL.
- If the env var is unset, the embedded Studio is completely unreachable
  (fails closed), so a fresh checkout won't accidentally expose it.

## 2. Add content

The left-hand nav is grouped into four sections under **Site Content** (one
per document type, defined in `schemaTypes/`):

- **Blouses** — the showcase carousel on the homepage (`GallerySlider`)
- **Sewing Products** — machines & spares catalog (`MachineCatalog`)
- **Instagram Posts** — the Instagram-style grid (`InstagramFeed`)
- **Branches** — the branch cards in the footer (`Footer`)

Each list is sorted by that document's `Display order` field — lower numbers
show first. Leave it blank to fall back to creation order.

Publish a document to make it live; the site reads only published content
(via the CDN-backed API).

## Studio branding

The Studio's nav bar, buttons, and focus states are recolored to match the
site's gold/maroon palette (`studio/theme.ts`, via Sanity's
`buildLegacyTheme`), it shows the boutique logo in the top-left and as the
browser tab icon (`studio/components/StudioLogo.tsx`), and the document nav
is grouped as described above instead of the default alphabetical schema
list (`studio/structure.ts`). Status colors (info/success/warning/danger)
are deliberately left at their defaults so validation errors stay legible.

## 3. Wire it into the site

The site already reads live content automatically — no extra step needed
once documents are published. It's configured via these `.env` variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="x2z5b5vj"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```

Restart `npm run dev` after changing `.env` (env vars are only read at
server start).

## 4. Allow the site's origin (CORS)

Sanity's API blocks browser requests from origins it doesn't recognize. In
[sanity.io/manage](https://sanity.io/manage) → your project → **API** →
**CORS origins**, add:

- `http://localhost:3000` (local dev — covers both the public site and the
  embedded Studio at your `STUDIO_ACCESS_PATH`)
- your production domain, once deployed (see `VERCEL_DEPLOYMENT.md`)

Check **"Allow credentials"** for both — the embedded Studio's login uses a
session cookie, which requires credentialed CORS. (The public site's own
read-only fetches don't need credentials, but it's harmless to allow them
since they share an origin with the Studio.)

## Notes & limitations

- Images are uploaded directly in the Studio (drag-and-drop onto the
  `Image` field) — Sanity hosts and optimizes them, no need to add files to
  `public/images`.
- If you edit a schema field in `schemaTypes/`, existing documents keep
  their data; only the Studio's editing form changes.
- `npm run studio:deploy` (hosting the Studio at a public
  `https://x2z5b5vj.sanity.studio` URL) is no longer the recommended way to
  reach the admin panel — use the embedded secret URL instead. The script
  is still there if you ever want a fallback copy, but two live copies of
  the same content is more to keep track of than most projects need.
