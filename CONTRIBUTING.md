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
3. Open a pull request using the template. Small, focused PRs are reviewed fastest.

By contributing you agree that your code is released under the MIT License and your content under CC BY-SA 4.0.
Please follow our [Code of Conduct](CODE_OF_CONDUCT.md).
