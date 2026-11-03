# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org).

## [Unreleased]

### Added
- Enterprise open-source governance: REUSE/SPDX licensing (`REUSE.toml`, `LICENSES/`), `NOTICE`, `GOVERNANCE.md`,
  `SUPPORT.md`, this changelog, `CODEOWNERS`, the full Contributor Covenant 2.1, and an expanded security policy.
- Developer Certificate of Origin (DCO) sign-off for contributions, checked on every pull request.
- CI: REUSE license compliance check, OpenSSF Scorecard, Dependabot updates for GitHub Actions.
- Dependabot pull requests are approved, merged and deployed automatically once all required checks pass.

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

[Unreleased]: https://github.com/appfide/oracle-fusion-erp-made-simple/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/appfide/oracle-fusion-erp-made-simple/compare/v1.0.0...v1.1.1
[1.0.0]: https://github.com/appfide/oracle-fusion-erp-made-simple/releases/tag/v1.0.0
