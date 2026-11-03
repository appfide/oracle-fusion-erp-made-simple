# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org).

## [Unreleased]

## [1.2.0] - 2026-11-03

### Added
- Enterprise open-source governance: REUSE/SPDX licensing (`REUSE.toml`, `LICENSES/`), `NOTICE`, `GOVERNANCE.md`,
  `SUPPORT.md`, this changelog, `CODEOWNERS`, the full Contributor Covenant 2.1, and an expanded security policy.
- Developer Certificate of Origin (DCO) sign-off for contributions, checked on every pull request.
- CI: REUSE license compliance check, OpenSSF Scorecard, Dependabot updates for GitHub Actions.
- Dependabot pull requests are approved, merged and deployed automatically once all required checks pass.
- Dependabot waits 7 days after an action is released before proposing it (supply-chain cooldown).
- Test suite (`npm test`, no dependencies) run on every pull request, in headless Chrome where it matters:
  - guardrails for the CSP, third-party requests, trackers, raw HTML, dangerous code, secrets, the offline cache and version numbers;
  - progress storage, including hostile backup files, plus fuzzing of backups (5,000 per run), the HTML sanitizer
    (3,000 generated documents per run), saved state on every page and hostile URLs in the router;
  - every page, module, lesson and practice lab rendered with no errors or CSP violations, and every in-app link followed;
  - learner journeys: every quiz passed with its answer key and failed with wrong answers, every hands-on exercise
    solved with its own answer, completing lessons, step-by-step navigation, settings, search, glossary,
    export/import/reset of progress, the certificate, and every practice lab with extreme values;
  - accessibility on every page (headings, names, labels, alt text, ARIA, focus, 24px targets), WCAG AA text
    contrast in light and dark themes, phone-width layout, keyboard navigation and offline use;
  - the search-engine pages: titles, descriptions, canonical URLs, structured data, sitemap, links and CSP;
  - CI hardening: pinned actions, least-privilege tokens, no script injection, no persisted credentials.

### Fixed
- Opening `#/lab/__proto__` or `#/lab/constructor` froze the page; unknown names are now "page not found", and a
  view that fails while loading shows the error page instead of hanging.
- The depreciation lab froze the browser for a very long useful life, and the payment-terms lab crashed for very
  large day counts; inputs are now kept to real-world ranges.
- Imported or stored progress with wrong value types (for example a non-text theme or pass mark) is cleaned up
  instead of being used as-is.
- "Skip to content" no longer replaces the page address; a link ending in a plain anchor shows the start page
  instead of a blank page.
- Accessibility: slide dots are 24px touch targets, and the practice-screen tag, highlighted search words and the
  red reset button meet WCAG AA contrast; practice labs no longer overflow on phones.

### Changed
- All GitHub Actions are pinned to full commit SHAs and run with least-privilege permissions.
- `LICENSE` now contains only the MIT license text so license scanners detect it; the code/content split is
  described in `REUSE.toml`, `NOTICE` and the README.

## [1.1.1] - 2026-11-03

### Added
- Search-friendly static lesson pages (`/learn/`), sitemap, robots.txt, 404 page, `llms.txt` and IndexNow pings.
- Release badge: lessons verified against Oracle Fusion Cloud Applications update 26D.

### Changed
- Modules reordered so each lesson only uses ideas taught before it (Basics → Accounts Payable → the rest).
- Project home moved to the `appfide` GitHub organization.

## [1.0.0] - 2026-11-03

### Added
- Initial release: beginner course on Oracle Fusion Cloud ERP with lessons, exercises, quizzes and simulators,
  offline support and browser-only progress.

[Unreleased]: https://github.com/appfide/oracle-fusion-erp-made-simple/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/appfide/oracle-fusion-erp-made-simple/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/appfide/oracle-fusion-erp-made-simple/compare/v1.0.0...v1.1.1
[1.0.0]: https://github.com/appfide/oracle-fusion-erp-made-simple/releases/tag/v1.0.0
