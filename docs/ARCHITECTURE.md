# Architecture

ERP Made Simple is a static web app: HTML, CSS and JavaScript modules served as plain files. There is no server-side
code, no build step for the app itself, no runtime dependencies and no third-party requests.

```
                       ┌──────────────── GitHub (source of truth) ────────────────┐
  contributor ── PR ──▶│ main branch ── CI: validate, lint, tests, coverage, REUSE, │
                       │                 DCO, CodeQL ── deploy job ── attestation  │
                       └───────────────────────────┬──────────────────────────────┘
                                                   ▼ static files
                                  GitHub Pages (HTTPS, appfide.github.io)
                                                   ▼
  learner's browser ── index.html ─▶ main.js (router) ─▶ views.js ─▶ blocks.js / interactive.js
                                      │                     │
                                      ▼                     ▼
                                 store.js ◀──▶ localStorage   content/lessons/*.js (loaded on demand)
                                      ▲
                                  sw.js (offline cache, same origin only)
```

## Components

| Part | File(s) | Responsibility |
| --- | --- | --- |
| App shell | `index.html` | Content-Security-Policy, metadata, loads `theme-boot.js` (no flash of the wrong theme) and `main.js` |
| Router and shell | `assets/js/main.js` | Hash routes (`#/lesson/<module>/<lesson>`), header, footer, bottom tab bar, page titles, focus management, service-worker registration |
| Views | `assets/js/views.js` | One function per page: home, module, lesson (step-by-step or whole page), search, glossary, credits, settings, about, accessibility statement, certificate, Practice Lab |
| Block renderers | `assets/js/blocks.js` | Turn lesson blocks (text, slides, flow, table, journal, quiz, …) into DOM |
| Interactive parts | `assets/js/interactive.js` | Hands-on exercises and the Practice Lab simulators (matching, payment terms, depreciation, journals, accounts, currencies) |
| DOM helpers | `assets/js/dom.js` | `h()` element builder (no raw HTML), the HTML sanitizer for lesson text, icons, toasts, screen-reader announcements |
| Content index | `assets/js/content.js`, `content/curriculum.js` | Order of modules and lessons; lessons are ES modules imported on demand and cached |
| Storage | `assets/js/store.js` | The only code that reads or writes progress: one `localStorage` key, validated on load and on import |
| Offline | `sw.js` | Precaches the shell, then stale-while-revalidate for same-origin GET requests |
| Lessons | `content/lessons/<module>/<lesson>.js` | Data only (no code), written to `docs/CONTENT_GUIDE.md` |

## Data flow

1. The browser loads `index.html`; the CSP allows scripts, styles, images and connections from the same origin only.
2. `main.js` reads the hash, picks a view and renders it. Lesson views import the lesson module, then render its
   blocks. Lesson text is the only HTML that comes from data; it passes through `sanitize()` (an allow-list of tags,
   https-only links).
3. Progress (completed lessons, quiz scores, finished exercises, the current step, settings, the certificate name) goes through `store.js` into one
   `localStorage` entry. Nothing leaves the browser. Export, import and reset are in Settings; imported files are
   treated as untrusted and normalised field by field.

## Build and release

- **Deploy**: on every push to `main`, `.github/workflows/pages.yml` runs all checks, copies the static files,
  runs `scripts/build-seo.mjs` (plain HTML pages per lesson for search engines, sitemap, robots.txt, llms.txt, 404,
  `.well-known/security.txt`), signs the exact artifact with build provenance, and deploys it to GitHub Pages.
- **Release**: pushing a version tag runs `.github/workflows/release.yml`, which builds the same site, zips it
  reproducibly and publishes a GitHub release with checksums and a Sigstore-signed provenance attestation.
- The build is reproducible: dates come from git (or `SOURCE_DATE_EPOCH`), so the same commit gives the same files.

## Quality gates

`npm test` runs every test (Node's built-in runner plus headless Chrome, no packages): see the table in the README.
CI also runs `scripts/lint.mjs` (the coding standard), `scripts/coverage.mjs` (fails below 80% line coverage), the
REUSE license check, the DCO sign-off check, CodeQL and OpenSSF Scorecard.

## Design decisions

- **No dependencies and no build step**, so anyone can read, run and audit the whole app, and there is no package
  supply chain to attack.
- **Hash routes**, because GitHub Pages cannot rewrite URLs; `build-seo.mjs` provides real URLs for search engines.
- **Lessons as data in JavaScript modules**, so they load with the CSP's `script-src 'self'` and are validated by
  `scripts/validate-content.mjs` in CI.
- See [ASSURANCE_CASE.md](ASSURANCE_CASE.md) for the security design.
