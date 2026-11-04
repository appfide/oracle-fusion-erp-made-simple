# Roadmap

What we plan for the next 12 months (November 2026 to November 2027). Plans change; the
[issues](https://github.com/appfide/oracle-fusion-erp-made-simple/issues) and the [changelog](CHANGELOG.md) show what
is actually happening. Ideas and help are welcome: open an issue to discuss anything here.

## Every quarter (ongoing)

- **Follow Oracle's quarterly updates.** Review every lesson against each new Oracle Fusion Cloud update
  (27A in February 2027, then 27B, 27C and 27D), update screens, names and features, and change the release badge.
- **Keep every cited source working** (`node scripts/check-links.mjs`) and fix lessons whose sources moved.
- **Keep the supply chain current.** Dependabot updates for the pinned GitHub Actions, security fixes first.

## Next (to May 2027)

- More hands-on practice: new Practice Lab simulators for bank reconciliation and the period-close checklist.
- More worked examples in the Receivables, Cash Management and General Ledger modules, at the same depth as
  Accounts Payable.
- OpenSSF Best Practices **silver** badge, then keep it.
- Make it easier to contribute a lesson: a lesson template and a short video-free walkthrough in `docs/`.

## Later (to November 2027)

- Translations, starting with the most requested language, once a native-speaking maintainer volunteers.
  The app will need language-aware routes and a per-language curriculum.
- Printable study notes for each module (generated from the same lesson files).
- Grow the maintainer team so that changes get a second reviewer and the project no longer depends on one person
  (needed for the OpenSSF Best Practices gold badge).

## Not planned

These would break the project's promises, so we will not do them:

- Accounts, sign-in, analytics, ads, cookies or anything that sends learner data anywhere.
- Third-party scripts, fonts or CDNs.
- Copying Oracle documentation text or screenshots (we explain in our own words and link to the source).
