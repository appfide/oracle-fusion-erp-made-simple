# 🍋 ERP Made Simple — Oracle Fusion Cloud ERP for absolute beginners

[![Code license: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)
[![Content license: CC BY-SA 4.0](https://img.shields.io/badge/content-CC%20BY--SA%204.0-lightgrey.svg)](LICENSE-CONTENT.md)
[![Validate and deploy](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/pages.yml/badge.svg)](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/pages.yml)
[![Compliance](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/compliance.yml/badge.svg)](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/compliance.yml)
[![CodeQL](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/github-code-scanning/codeql)
[![Dependabot auto-merge](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/dependabot-auto-merge.yml/badge.svg)](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/dependabot-auto-merge.yml)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/16293/badge)](https://www.bestpractices.dev/projects/16293)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/appfide/oracle-fusion-erp-made-simple/badge)](https://scorecard.dev/viewer/?uri=github.com/appfide/oracle-fusion-erp-made-simple)
[![REUSE compliant](https://img.shields.io/badge/REUSE-compliant-2ea44f)](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/compliance.yml)
[![Release](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/release.yml/badge.svg)](https://github.com/appfide/oracle-fusion-erp-made-simple/releases)
[![Signed: SLSA build provenance](https://img.shields.io/badge/signed-SLSA%20provenance-2ea44f?logo=sigstore&logoColor=white)](https://github.com/appfide/oracle-fusion-erp-made-simple/attestations)
[![Accessibility: WCAG 2.2 AA](https://img.shields.io/badge/WCAG%202.2-AA-2ea44f)](https://appfide.github.io/oracle-fusion-erp-made-simple/#/accessibility)
[![Line coverage ≥ 80%](https://img.shields.io/badge/coverage-%E2%89%A580%25%20enforced-2ea44f)](CONTRIBUTING.md#tests)
[![security.txt](https://img.shields.io/badge/security.txt-RFC%209116-2ea44f)](https://appfide.github.io/oracle-fusion-erp-made-simple/.well-known/security.txt)

Created by **[Appfide Private Limited](https://appfide.com)**.

> ✅ **Matches Oracle Fusion Cloud Applications update 26D** (checked November 2026). Oracle rolls 26D out to
> customers from mid-November 2026 to mid-January 2027; if your company is still on 26C, almost everything is the same,
> and lessons say when a feature is new in a specific update. Lessons are reviewed every quarter.

A free, open-source web app that teaches **Oracle Fusion Cloud ERP** step by step — explained so simply that a
10-year-old could follow, yet deep enough to use at work.

**▶ Start learning: https://appfide.github.io/oracle-fusion-erp-made-simple/**

- 🧱 **Basics first** — what an ERP is, money words (debits and credits), moving around the screens, enterprise structure, ledgers, setup and security.
- 💸 **Then Accounts Payable in depth** — suppliers, invoices, matching, holds, approvals, accounting, payments, prepayments, tax, month-end and reports.
- 🧩 **Then everything else, following the money** — Procurement and Expenses (next to Payables), Receivables, Cash Management, Fixed Assets, then the General Ledger where every module's journals land and the month is closed. Then Reporting, data and integrations, Tax, Intercompany, Budgetary Control, quarterly updates and AI. Each lesson only uses ideas taught before it.
- 🎞️ **Slides, flow diagrams, worked examples, journal entries and quizzes** in every lesson, all following one story company: *Sunny Lemonade Co.*
- 📚 **Every lesson credits its sources** (mainly the official Oracle Help Center). All sources are listed on the in-app *Sources & Credits* page.

## Privacy by design

- No accounts, no login, no cookies, no analytics, no ads, no third-party scripts or fonts.
- Progress (completed lessons, quiz scores, settings) is stored **only in the learner's browser** (`localStorage`).
- Settings let learners **export, import or reset** their progress at any time.
- A strict Content-Security-Policy allows only same-origin resources.
- Works offline after the first visit (service worker).

## Accessibility

The guide aims to meet **WCAG 2.2 level AA**, and every page is tested for it on every change (headings, names,
labels, contrast in both themes, 24px targets, keyboard use, phone width). Read the
[accessibility statement](https://appfide.github.io/oracle-fusion-erp-made-simple/#/accessibility) to see what is
covered, the known limitations and how to report a problem.

## Run locally

No build step and no dependencies. Any static file server works:

```bash
python3 -m http.server 8080      # then open http://localhost:8080
# or: npx serve .
```

(Opening `index.html` directly from the file system won't work because browsers block ES modules on `file://`.)

## Project structure

```
index.html                 App shell (CSP, manifest, entry script)
assets/css/app.css         All styles (light/dark themes, text sizes, print)
assets/js/                 App code — router, views, block renderers, storage
content/curriculum.js      Order of modules and lessons (single source of truth)
content/lessons/<module>/<lesson>.js   One file per lesson
docs/CONTENT_GUIDE.md      How to write lessons (audience, accuracy rules, block types)
scripts/validate-content.mjs   Validates every lesson (run in CI)
scripts/check-links.mjs    Checks all cited source URLs still work
scripts/build-seo.mjs      Builds search-friendly text pages (/learn/…), sitemap.xml, robots.txt, security.txt (run in CI)
scripts/lint.mjs           The coding standard (run in CI and by npm test)
scripts/coverage.mjs       Line coverage of the test suite, no packages (CI fails below 80%)
docs/ARCHITECTURE.md       How the app fits together
docs/ASSURANCE_CASE.md     Security requirements, threat model and how each weakness is countered
sw.js, manifest.webmanifest    Offline support / installable app
```

## Contributing

Contributions are very welcome — fix a typo, improve an explanation, update a lesson for a new Oracle release, add a
lesson or translate. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md), then run:

```bash
node scripts/validate-content.mjs   # lesson structure and accuracy rules
npm run lint                        # the coding standard
npm test                            # the full test suite (about 30 seconds, needs Chrome or Chromium)
npm run coverage                    # the same, with a line-coverage report
node --test tests/journeys.test.mjs # or one area at a time
FUZZ_SEED=1234 npm test             # repeat a fuzz run exactly (the seed is printed in each fuzz test's name)
```

Every pull request runs both, plus a license (REUSE) check, DCO sign-off and CodeQL. None of them need `npm install`.

### Automated checks

| Check | When | What it guarantees |
| --- | --- | --- |
| [Validate and deploy](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/pages.yml) | every pull request and push to `main` | content rules, lint, the test suite below, ≥ 80% line coverage, then a signed deploy to GitHub Pages |
| [Release](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/release.yml) | every version tag | the built site as a zip with checksums and a Sigstore-signed SLSA provenance attestation |
| [Compliance](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/compliance.yml) | every pull request and push to `main` | every file licensed (REUSE/SPDX); every commit signed off (DCO) |
| [CodeQL](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/github-code-scanning/codeql) | every pull request, push and weekly | static security analysis of the JavaScript and workflows |
| [OpenSSF Scorecard](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/scorecard.yml) | weekly and on push to `main` | supply-chain security score |
| [Dependabot auto-merge](https://github.com/appfide/oracle-fusion-erp-made-simple/actions/workflows/dependabot-auto-merge.yml) | Dependabot pull requests | pinned actions kept current, merged only after every check passes |

The test suite (`tests/`, Node's built-in test runner plus headless Chrome, no packages):

| File | Covers |
| --- | --- |
| `static.test.mjs` | Content-Security-Policy, no third-party requests or trackers, storage rules, no `eval`, raw-HTML allow-list, offline cache, versions, secrets |
| `store.test.mjs`, `fuzz.test.mjs` | progress storage; 5,000 random and hostile backups per run (prototype pollution, wrong types, huge values) |
| `browser.test.mjs` | every page, module, lesson and lab rendered with no errors; every in-app link; hostile URLs; 150 corrupted saved states; the HTML sanitizer against XSS payloads and 3,000 fuzzed documents |
| `journeys.test.mjs` | what learners do: every quiz and every hands-on exercise solved with its answer key, completing lessons, step-by-step navigation, settings, search, glossary, export/import/reset, certificate, every lab with extreme values |
| `a11y.test.mjs` | accessibility on every page (headings, names, labels, ARIA, focus, 24px targets), WCAG AA contrast in light and dark, phone width, keyboard use, offline mode, the accessibility statement |
| `seo.test.mjs` | the search-engine pages: titles, descriptions, canonical URLs, structured data, sitemap, robots.txt, links, CSP; security.txt (RFC 9116); the build is reproducible |
| `repo.test.mjs` | CI hardening (pinned actions, least privilege, no script injection), signed deploys and releases, policy files, badges, curriculum integrity, every script parses |
| `tools.test.mjs` | the project's own tools catch what they promise: the linter (every rule, no false alarms), the coverage reporter, the source-link checker (fake network) |

## Verify what you get

Every deployment of the site and every [release](https://github.com/appfide/oracle-fusion-erp-made-simple/releases) is signed with
[SLSA build provenance](https://github.com/appfide/oracle-fusion-erp-made-simple/attestations) (Sigstore, keyless). It proves the files were built by this repository's
CI from a specific commit. To check a release zip:

```bash
gh attestation verify erp-made-simple-v1.3.0.zip -R appfide/oracle-fusion-erp-made-simple
sha256sum -c SHA256SUMS
```

The build is reproducible: the same commit always gives the same files.

## Hosting

The site is plain static files. It deploys automatically to **GitHub Pages** via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) on every push to `main` (after validation passes).
To self-host, copy `index.html`, `manifest.webmanifest`, `sw.js`, `assets/` and `content/` to any web server
(Nginx, Apache, Cloudflare Pages, Netlify, S3…), then run `node scripts/build-seo.mjs <that folder>` to add the
search-friendly lesson pages and sitemap (set `site` in `assets/js/config.js` to your URL first). No server-side code is needed.

## License

- App code, tooling and configuration: [MIT](LICENSE)
- Lesson content (`content/`) and docs (`docs/`): [CC BY-SA 4.0](LICENSE-CONTENT.md)
- Code of Conduct: Contributor Covenant 2.1, CC BY 4.0

Every file's license is declared in machine-readable form in [`REUSE.toml`](REUSE.toml) (REUSE / SPDX), with full
license texts in [`LICENSES/`](LICENSES/), and checked in CI. Attribution and trademark notices are in [`NOTICE`](NOTICE).
The site has no third-party dependencies.

## Project policies

[Contributing](CONTRIBUTING.md) (with DCO sign-off) · [Code of Conduct](CODE_OF_CONDUCT.md) ·
[Security policy](SECURITY.md) · [Support](SUPPORT.md) · [Governance](GOVERNANCE.md) · [Roadmap](ROADMAP.md) ·
[Changelog](CHANGELOG.md) · [Architecture](docs/ARCHITECTURE.md) · [Security assurance case](docs/ASSURANCE_CASE.md) ·
[Accessibility statement](https://appfide.github.io/oracle-fusion-erp-made-simple/#/accessibility)

## Disclaimer

This is an independent community project. It is **not** affiliated with, endorsed by, or sponsored by Oracle.
Oracle, Java, MySQL and NetSuite are registered trademarks of Oracle and/or its affiliates. Oracle Fusion Cloud
Applications are updated every quarter, so screens and names can change — always confirm details in the
[official Oracle documentation](https://docs.oracle.com/en/cloud/saas/financials/index.html) for your release.
This guide is not official Oracle training and does not lead to an Oracle certification.
