# 🍋 ERP Made Simple — Oracle Fusion Cloud ERP for absolute beginners

Created by **Appfide Private Limited**.

A free, open-source web app that teaches **Oracle Fusion Cloud ERP** step by step — explained so simply that a
10-year-old could follow, yet deep enough to use at work.

**▶ Start learning: https://dhipin.github.io/oracle-fusion-erp-made-simple/**

- 🧱 **Basics first** — what an ERP is, money words (debits and credits), moving around the screens, enterprise structure, ledgers, setup and security.
- 💸 **Then Accounts Payable in depth** — suppliers, invoices, matching, holds, approvals, accounting, payments, prepayments, tax, month-end and reports.
- 🧩 **Then everything else** — General Ledger, Receivables, Cash Management, Fixed Assets, Expenses, Procurement, Reporting, data and integrations, Tax, Intercompany, Budgetary Control, quarterly updates and AI.
- 🎞️ **Slides, flow diagrams, worked examples, journal entries and quizzes** in every lesson, all following one story company: *Sunny Lemonade Co.*
- 📚 **Every lesson credits its sources** (mainly the official Oracle Help Center). All sources are listed on the in-app *Sources & Credits* page.

## Privacy by design

- No accounts, no login, no cookies, no analytics, no ads, no third-party scripts or fonts.
- Progress (completed lessons, quiz scores, settings) is stored **only in the learner's browser** (`localStorage`).
- Settings let learners **export, import or reset** their progress at any time.
- A strict Content-Security-Policy allows only same-origin resources.
- Works offline after the first visit (service worker).

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
sw.js, manifest.webmanifest    Offline support / installable app
```

## Contributing

Contributions are very welcome — fix a typo, improve an explanation, update a lesson for a new Oracle release, add a
lesson or translate. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md), then run:

```bash
node scripts/validate-content.mjs
```

## Hosting

The site is plain static files. It deploys automatically to **GitHub Pages** via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) on every push to `main` (after validation passes).
To self-host, copy `index.html`, `manifest.webmanifest`, `sw.js`, `assets/` and `content/` to any web server
(Nginx, Apache, Cloudflare Pages, Netlify, S3…). No server-side code is needed.

## License

- App code: [MIT](LICENSE)
- Lesson content and docs: [CC BY-SA 4.0](LICENSE-CONTENT.md)

## Disclaimer

This is an independent community project. It is **not** affiliated with, endorsed by, or sponsored by Oracle.
Oracle, Java, MySQL and NetSuite are registered trademarks of Oracle and/or its affiliates. Oracle Fusion Cloud
Applications are updated every quarter, so screens and names can change — always confirm details in the
[official Oracle documentation](https://docs.oracle.com/en/cloud/saas/financials/index.html) for your release.
This guide is not official Oracle training and does not lead to an Oracle certification.
