# Contributing

Thank you for helping people learn! 🍋

## Ways to help

- **Report a mistake** — open a "Content error" issue with the lesson link and, ideally, an official Oracle source.
- **Improve a lesson** — clearer wording, a better analogy, a new example, an updated screen name for a new release.
- **Write a new lesson** — propose it in an issue first so we can agree where it fits in `content/curriculum.js`.
- **Improve the app** — accessibility, performance, features. Keep it dependency-free and privacy-first.

## Ground rules for content

1. Read [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md). It explains the audience (a curious 10-year-old), the story
   world (Sunny Lemonade Co.), the block types and the accuracy rules.
2. **Verify Oracle-specific facts** against an official source and list it in the lesson's `sources`.
3. **Write in your own words.** Never paste text from Oracle documentation or other websites. No screenshots from Oracle.
4. Run `node scripts/validate-content.mjs` and fix all errors.

## Ground rules for code

- No build step, no runtime dependencies, no third-party requests (fonts, CDNs, analytics). This is a privacy promise.
- Everything the app stores stays in `localStorage` under one key (see `assets/js/store.js`).
- Keep it accessible: keyboard navigation, visible focus, labels, color contrast in light and dark themes.
- If you change files in the app shell, bump `VERSION` in `sw.js` so learners get the update.

## Pull requests

1. Fork the repository and create a branch.
2. Make your change and run the validator.
3. Commit with a sign-off: `git commit -s` (see below).
4. Open a pull request using the template. Small, focused PRs are reviewed fastest.

Every change to `main` goes through a pull request. CI must pass (content validation, REUSE license check, DCO
sign-off) and a maintainer must approve it. See [GOVERNANCE.md](GOVERNANCE.md).

## Developer Certificate of Origin (DCO)

We use the [Developer Certificate of Origin 1.1](https://developercertificate.org/) instead of a CLA. By adding a
`Signed-off-by` line to each commit you certify that you wrote the change, or otherwise have the right to submit it
under this project's licenses. Git adds the line for you:

```bash
git commit -s -m "Explain prepayments more simply"
# adds:  Signed-off-by: Your Name <you@example.com>
```

The name and email must match the commit author. Forgot? Run `git commit --amend -s` (one commit) or
`git rebase --signoff main` (several), then force-push your branch. Edits made in the GitHub web editor are signed
off automatically. Commits from GitHub-verified bots (such as Dependabot) are exempt.

## Licensing of contributions

Inbound = outbound: code you contribute is released under the [MIT License](LICENSE); lesson content (`content/`)
and documentation (`docs/`) under [CC BY-SA 4.0](LICENSE-CONTENT.md). The license of every file is declared in
[`REUSE.toml`](REUSE.toml) and checked in CI. Do not add third-party code, fonts, images or text unless its license
is compatible and you add it to `REUSE.toml` and [`NOTICE`](NOTICE).

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md). Report security issues privately — see [SECURITY.md](SECURITY.md).
