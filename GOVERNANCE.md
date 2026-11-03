# Governance

## Roles

- **Steward** — [Appfide Private Limited](https://appfide.com) owns the repository, the project name and the
  published site, and is responsible for licensing, security and the Code of Conduct.
- **Maintainers** — review and merge pull requests, triage issues, run quarterly Oracle release reviews and cut
  releases. Current maintainers are listed in [.github/CODEOWNERS](.github/CODEOWNERS).
- **Contributors** — anyone who opens an issue, improves a lesson or sends a pull request.

## How decisions are made

- Day-to-day changes are decided in pull requests. Every change to `main` goes through a pull request that passes
  CI and is approved by a maintainer.
- Dependabot updates to the pinned GitHub Actions are approved and merged automatically once every required check
  passes (`.github/workflows/dependabot-auto-merge.yml`), then deployed. A failing update stays open for a maintainer.
- Larger changes (new modules, changes to the content rules in `docs/CONTENT_GUIDE.md`, licensing, privacy) are
  proposed in an issue first. Maintainers aim for consensus; if there is none, Appfide makes the final call and
  records the reason in the issue.
- The privacy promise (no accounts, no tracking, no third-party requests) and the licenses can only be changed by
  the steward, after a public issue that stays open for at least 14 days.

## Becoming a maintainer

Contributors with a record of accurate, helpful contributions over several months may be invited by the existing
maintainers. Maintainers who are inactive for 12 months may be moved to emeritus status.

## Releases

The site deploys from `main` automatically. Versions follow [Semantic Versioning](https://semver.org) in
`assets/js/config.js` and `package.json`, and notable changes are recorded in [CHANGELOG.md](CHANGELOG.md). Lessons
are reviewed against each quarterly Oracle Fusion update.
