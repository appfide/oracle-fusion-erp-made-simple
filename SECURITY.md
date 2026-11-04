# Security Policy

ERP Made Simple is a static website: no server-side code, no accounts, no cookies and no data collection.
Learner progress stays in the learner's own browser (`localStorage`). Even so, we take security reports seriously.

## Supported versions

Only the latest version on the `main` branch, as published at
<https://appfide.github.io/oracle-fusion-erp-made-simple/>, receives security fixes.

## Reporting a vulnerability

**Please do not open a public issue for security problems.** Report privately by either:

1. **GitHub private vulnerability reporting** — [Security → Report a vulnerability](https://github.com/appfide/oracle-fusion-erp-made-simple/security/advisories/new) (preferred), or
2. Email **code@appfide.com** with the subject `SECURITY: ERP Made Simple`.

Please include the affected URL or file, steps to reproduce, and the impact you expect. These contacts are also
published in machine-readable form at
<https://appfide.github.io/oracle-fusion-erp-made-simple/.well-known/security.txt> (RFC 9116).

## What to expect

| Step | Target time |
|---|---|
| Acknowledge your report | 3 business days |
| Initial assessment and severity | 7 business days |
| Fix for a confirmed high or critical issue | 30 days |

We will keep you updated, credit you in the advisory if you wish, and publish a GitHub Security Advisory once a fix
is live (coordinated disclosure). Please give us a reasonable time to fix the issue before disclosing it publicly.

## What the site does and does not promise

The security requirements, threat model and the countermeasure for each common weakness are in
[docs/ASSURANCE_CASE.md](docs/ASSURANCE_CASE.md).

## Verifying what you download

Every deployment of the site and every [release](https://github.com/appfide/oracle-fusion-erp-made-simple/releases)
is signed with SLSA build provenance. Check that a release zip was built by this repository's CI:

```bash
gh attestation verify erp-made-simple-v1.3.0.zip -R appfide/oracle-fusion-erp-made-simple
```

## In scope

- Script injection or Content-Security-Policy bypass through lesson content, URLs or imported progress files
- Anything that makes the site send data to a third party, or load third-party resources
- Weaknesses in the repository's CI/CD workflows or GitHub Pages deployment

## Out of scope

- Reports from automated scanners without a demonstrated impact
- Missing security headers that GitHub Pages does not allow us to set
- Social engineering, physical attacks, or denial of service

## Safe harbor

We will not take legal action against people who research and report in good faith under this policy, avoid
privacy violations and service disruption, and give us a chance to fix the issue first.
