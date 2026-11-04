# Security assurance case

This document explains why we believe ERP Made Simple meets its security requirements: what we protect, from whom,
where the trust boundaries are, which design principles we follow, and how each common class of weakness is
countered. Each claim names the evidence, which is checked automatically on every pull request where possible.
See also [ARCHITECTURE.md](ARCHITECTURE.md) and the [security policy](../SECURITY.md).

## 1. Security requirements

What users can expect:

1. **Privacy**: the site collects nothing. No accounts, cookies, analytics or third-party requests; progress stays in
   the learner's browser.
2. **Integrity of the site**: what learners receive is what was reviewed and merged on `main`, built by this
   repository's CI.
3. **No script injection**: no lesson text, URL or imported backup file can run script or load outside resources.
4. **Availability of learner progress**: corrupted or hostile saved data never breaks the site; learners can export,
   import and reset it.

What users cannot expect: the site is a learning guide, not Oracle software, and does not handle credentials,
payments or personal data, so there is no authentication, authorisation or encryption at the application level. The
site cannot protect progress from someone with access to the learner's browser profile. GitHub Pages does not let us
set HTTP security headers, so the CSP is a `<meta>` tag.

## 2. Threat model and trust boundaries

| Boundary | Untrusted input | Main threats |
| --- | --- | --- |
| Browser ⇄ page URL | the hash route and query (`#/lesson/…?q=`) | script injection, crashes, prototype pollution via ids |
| Browser ⇄ `localStorage` | saved state (another tab, an extension, a corrupted write) | broken pages, prototype pollution, huge values |
| Browser ⇄ imported backup | a JSON file chosen by the learner | the same, from a file someone sent them |
| Repository ⇄ contributors | pull requests (lesson text, code, workflows) | malicious HTML in lessons, workflow injection, stolen tokens |
| Repository ⇄ supply chain | GitHub Actions used by CI | a compromised action stealing the deploy token |
| Site ⇄ hosting | GitHub Pages | a tampered artifact |

Attackers we consider: a malicious contributor, a malicious link or backup file sent to a learner, a compromised
GitHub Action, and passive network observers. Out of scope: a compromised GitHub account of a maintainer (mitigated
by GitHub's own controls and branch rules) and attacks on the learner's device.

## 3. Secure design principles applied

- **Economy of mechanism**: no server, no dependencies, no build step for the app; about 2,300 lines of app code.
- **Fail-safe defaults**: the CSP allows only `'self'` and blocks `object-src`, `base-uri` and form posts; the HTML
  sanitizer is an allow-list; settings and imports are validated against allow-lists and anything else is dropped.
- **Complete mediation**: all storage goes through `store.js`; all lesson HTML goes through `sanitize()`.
- **Least privilege**: workflow tokens are read-only by default; only the deploy and release jobs get write or
  signing rights; checkouts never keep the token.
- **Separation of privilege**: changes to `main` need a pull request, passing checks and a code-owner approval.
- **Open design**: everything, including the tests and this document, is public.
- **Psychological acceptability**: privacy needs no settings; learners never see a consent banner.

## 4. Common weaknesses and how they are countered

| Weakness (CWE / OWASP) | Countermeasure | Evidence |
| --- | --- | --- |
| Cross-site scripting (CWE-79) | DOM built with `h()`, never raw HTML; lesson HTML passes an allow-list sanitizer with https-only links; CSP `script-src 'self'`; static pages `script-src 'none'` | `tests/static.test.mjs`, `tests/browser.test.mjs` (XSS payloads and 3,000 fuzzed documents in a real browser), `tests/seo.test.mjs`, CodeQL |
| Code injection (CWE-94/95) | no `eval`, `new Function`, string timers or `document.write` | `tests/static.test.mjs`, `scripts/lint.mjs` |
| Prototype pollution (CWE-1321) | `Object.hasOwn` for every id lookup; `__proto__`, `constructor`, `prototype` keys dropped on load | `tests/store.test.mjs`, `tests/fuzz.test.mjs` (5,000 hostile backups), router fuzz in `tests/browser.test.mjs` |
| Improper input validation (CWE-20) | every stored and imported field normalised; lab inputs clamped to safe ranges | `tests/store.test.mjs`, lab chaos tests in `tests/journeys.test.mjs` |
| Uncontrolled resource use (CWE-400) | lab inputs bounded so no calculation can loop for long | lab edge-case tests (each must finish in under 2 seconds) |
| Exposure of information (CWE-200) | no network requests to other sites; nothing collected | `tests/static.test.mjs` (no third-party URLs, no trackers) |
| Workflow injection | event data reaches shell scripts only through environment variables; no `pull_request_target` | `tests/repo.test.mjs` |
| Supply-chain compromise | every action pinned to a full commit SHA; only GitHub-owned and two reviewed actions allowed; Dependabot with a 7-day cooldown | `tests/repo.test.mjs`, repository Actions policy, OpenSSF Scorecard |
| Tampered build | the deployed artifact and every release are signed with SLSA build provenance (Sigstore) | `gh attestation verify`; `tests/repo.test.mjs` |
| Secrets in the repository | none are needed; scanning for committed keys | `tests/static.test.mjs`, GitHub secret scanning and push protection |
| Weak transport (CWE-319) | GitHub Pages serves HTTPS only (TLS 1.2+); all source links are https | `tests/repo.test.mjs`, `scripts/validate-content.mjs` |

## 5. Verification

- Every pull request runs: content validation, lint, the full test suite in headless Chrome, at least 80% line
  coverage, REUSE, DCO sign-off and CodeQL. OpenSSF Scorecard runs weekly.
- New features need tests, and bug fixes need a regression test (see [CONTRIBUTING.md](../CONTRIBUTING.md)).
- Vulnerabilities are reported privately (see [SECURITY.md](../SECURITY.md) and `/.well-known/security.txt`).

This document is reviewed whenever the architecture changes, and at least once a year.
