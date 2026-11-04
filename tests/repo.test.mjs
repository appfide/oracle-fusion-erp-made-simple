/**
 * Repository guardrails: CI/CD workflows stay hardened against supply-chain and injection
 * attacks, project policy files stay in place, and the content and code are well-formed
 * (every lesson file exists, every route id is reachable, every script parses).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './helpers/chrome.mjs';

const read = (f) => readFileSync(join(ROOT, f), 'utf8');
const WF_DIR = '.github/workflows';
const workflows = readdirSync(join(ROOT, WF_DIR)).filter((f) => /\.ya?ml$/.test(f)).map((f) => ({ f: `${WF_DIR}/${f}`, src: read(`${WF_DIR}/${f}`) }));
const pkg = JSON.parse(read('package.json'));

/** The `run:` scripts of a workflow (inline and block form). */
function runBlocks(src) {
  const out = [];
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\s*)(?:- )?run:\s*(.*)$/);
    if (!m) continue;
    if (!/^[|>]/.test(m[2])) { out.push(m[2]); continue; }
    const indent = m[1].length;
    const body = [];
    for (i++; i < lines.length && (lines[i].trim() === '' || lines[i].match(/^\s*/)[0].length > indent); i++) body.push(lines[i]);
    i--;
    out.push(body.join('\n'));
  }
  return out;
}

test('workflows: every action is pinned to a full commit SHA with its version noted', () => {
  let count = 0;
  for (const { f, src } of workflows) {
    for (const m of src.matchAll(/^\s*(?:-\s*)?uses:\s*(\S+)(.*)$/gm)) {
      count++;
      const [, ref, rest] = m;
      if (ref.startsWith('./')) continue;
      assert.match(ref, /^[\w.-]+\/[\w./-]+@[0-9a-f]{40}$/, `${f}: "${ref}" is not pinned to a commit SHA`);
      assert.match(rest, /#\s*v\d+/, `${f}: "${ref}" has no "# vX.Y.Z" comment (Dependabot needs it)`);
    }
  }
  assert.ok(count >= 8, 'too few actions found; is the parser broken?');
});

test('workflows: least-privilege token, no dangerous triggers', () => {
  for (const { f, src } of workflows) {
    assert.match(src, /^permissions:/m, `${f}: no top-level permissions (token would get the repo default)`);
    const top = src.match(/^permissions:([\s\S]*?)^\S/m)?.[1] ?? '';
    assert.doesNotMatch(top, /:\s*write/, `${f}: write permission granted to every job; grant it on the job that needs it`);
    assert.doesNotMatch(src, /pull_request_target|workflow_run:/, `${f}: pull_request_target/workflow_run run untrusted code with secrets`);
    assert.doesNotMatch(src, /permissions:\s*write-all/, `${f}: write-all`);
    assert.doesNotMatch(src, /secrets\.(?!GITHUB_TOKEN\b)\w+/, `${f}: uses a secret other than GITHUB_TOKEN`);
  }
});

test('workflows: no script injection — event data reaches shell scripts only through env', () => {
  const untrusted = /\$\{\{\s*(github\.event\.|github\.head_ref|inputs\.|steps\.[^}]*outputs)/;
  for (const { f, src } of workflows) {
    for (const body of runBlocks(src)) assert.doesNotMatch(body, untrusted, `${f}: \${{ }} expression inside a run script:\n${body}`);
  }
});

test('workflows: checkouts never keep the token on disk', () => {
  for (const { f, src } of workflows) {
    const steps = src.split(/\n\s*- /).filter((s) => /uses:\s*actions\/checkout@/.test(s));
    for (const s of steps) assert.match(s, /persist-credentials:\s*false/, `${f}: checkout without persist-credentials: false`);
  }
});

test('workflows: Dependabot auto-merge is limited to Dependabot and waits for required checks', () => {
  const { src } = workflows.find((w) => w.f.endsWith('dependabot-auto-merge.yml'));
  assert.match(src, /^on:\s*pull_request\s*$/m);
  assert.match(src, /github\.event\.pull_request\.user\.login == 'dependabot\[bot\]' && github\.actor == 'dependabot\[bot\]'/);
  assert.match(src, /gh pr merge --auto/, 'must use --auto so branch protection checks still gate the merge');
  assert.doesNotMatch(src, /--admin/, 'auto-merge must never bypass branch protection');
  assert.doesNotMatch(src, /actions\/checkout/, 'auto-merge must not check out (and so never runs) pull request code');
});

test('workflows: the required status checks exist, and CI runs the same tests as npm test', () => {
  const all = workflows.map((w) => w.src).join('\n');
  assert.match(read(`${WF_DIR}/pages.yml`), /^\s{2}validate:\s*$/m, 'job "validate" (required check) is missing');
  assert.match(all, /name: REUSE license compliance/, 'required check "REUSE license compliance" is missing');
  assert.match(all, /name: DCO sign-off/, 'required check "DCO sign-off" is missing');
  assert.ok(read(`${WF_DIR}/pages.yml`).includes(pkg.scripts.test.replace(/^node /, 'node ')), 'CI test command differs from npm test');
  const nodeVersions = [...all.matchAll(/node-version:\s*(\d+)/g)].map((m) => Number(m[1]));
  const min = Number(pkg.engines.node.match(/\d+/)[0]);
  for (const v of nodeVersions) assert.ok(v >= min, `CI uses Node ${v}, below engines ${pkg.engines.node}`);
  assert.match(read(`${WF_DIR}/pages.yml`), /needs: validate/, 'deploy must wait for the tests');
});

test('workflows: the deployed site and every release are signed with build provenance', () => {
  const pages = read(`${WF_DIR}/pages.yml`);
  const deploy = pages.slice(pages.indexOf('\n  deploy:'));
  assert.match(deploy, /uses: actions\/attest-build-provenance@[0-9a-f]{40}[^\n]*\n\s+with:\n\s+subject-path: \$\{\{ runner\.temp \}\}\/artifact\.tar/, 'the Pages artifact is not attested');
  assert.ok(deploy.indexOf('upload-pages-artifact') < deploy.indexOf('attest-build-provenance') && deploy.indexOf('attest-build-provenance') < deploy.indexOf('deploy-pages'), 'attest after upload and before deploy');
  assert.match(deploy, /id-token: write/);
  assert.match(deploy, /attestations: write/);
  assert.match(deploy, /include-hidden-files: true/, 'without include-hidden-files, .well-known/security.txt is silently left out of the site');

  const rel = read(`${WF_DIR}/release.yml`);
  assert.match(rel, /^on:\n\s+push:\n\s+tags: \['v\*'\]/m, 'releases must run on version tags');
  assert.match(rel, /\^v\[0-9\]\+\\\.\[0-9\]\+\\\.\[0-9\]\+\$/, 'the tag name must be validated before use');
  assert.ok(rel.indexOf('Check the tag name') < rel.indexOf('actions/checkout'), 'validate the tag before checking it out');
  assert.match(rel, /does not match package\.json version/, 'a tag must match package.json');
  const job = rel.slice(rel.indexOf('\njobs:'));
  for (const p of ['contents: write', 'id-token: write', 'attestations: write']) assert.match(job, new RegExp(p), `release job needs ${p}`);
  assert.match(rel, /uses: actions\/attest-build-provenance@[0-9a-f]{40}[^\n]*\n\s+with:\n\s+subject-path: dist\/erp-made-simple-\*\.zip/);
  // Scorecard "Signed-Releases" looks for these files on the release.
  assert.match(rel, /\.zip\.sigstore\.json/);
  assert.match(rel, /\.intoto\.jsonl/);
  assert.match(rel, /SHA256SUMS/);
  assert.match(rel, /--verify-tag/, 'a release must never create its own tag');
  assert.match(rel, /--sort=-v:refname/, 'only the highest version may be marked Latest');
  assert.match(rel, /--latest="\$latest"/, 'only the highest version may be marked Latest');
  // A release contains exactly the site that is deployed.
  const prep = (src) => src.match(/- name: Prepare site\n\s+run: \|\n((?:\s{10}.*\n)+)/)?.[1];
  assert.ok(prep(pages), 'pages.yml has no "Prepare site" step');
  assert.equal(prep(rel), prep(pages), 'release.yml and pages.yml build the site differently');
});

test('workflows: CI runs the linter and enforces code coverage', () => {
  const pages = read(`${WF_DIR}/pages.yml`);
  assert.match(pages, /run: node scripts\/lint\.mjs/);
  const tests = pages.slice(pages.indexOf('- name: Run tests'));
  assert.match(tests, /NODE_V8_COVERAGE: \$\{\{ runner\.temp \}\}\/coverage/);
  assert.match(tests, /COVERAGE_DIR: \$\{\{ runner\.temp \}\}\/coverage/);
  assert.match(pages, /run: node scripts\/coverage\.mjs --report "\$COVERAGE"/);
  assert.equal(pkg.scripts.lint, 'node scripts/lint.mjs');
  assert.equal(pkg.scripts.coverage, 'node scripts/coverage.mjs');
  assert.match(read('scripts/coverage.mjs'), /MIN_COVERAGE \?\? 80\)/, 'the coverage minimum must stay at least 80%');
});

test('Dependabot keeps actions current with a cooldown against fresh malicious releases', () => {
  const dep = read('.github/dependabot.yml');
  assert.match(dep, /package-ecosystem:\s*["']?github-actions/);
  assert.match(dep, /cooldown:\s*\n\s*default-days:\s*[1-9]/);
});

test('project policy files are present and licences are consistent', () => {
  for (const f of ['ROADMAP.md', 'docs/ARCHITECTURE.md', 'docs/ASSURANCE_CASE.md', 'LICENSE', 'LICENSES/MIT.txt', 'LICENSES/CC-BY-SA-4.0.txt', 'NOTICE', 'REUSE.toml', 'README.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md',
    'SECURITY.md', 'SUPPORT.md', 'GOVERNANCE.md', 'CHANGELOG.md', '.github/CODEOWNERS', '.github/PULL_REQUEST_TEMPLATE.md', '.github/ISSUE_TEMPLATE/config.yml', '.editorconfig']) {
    assert.ok(existsSync(join(ROOT, f)), `${f} is missing`);
  }
  assert.match(read('LICENSE'), /^MIT License/);
  assert.equal(pkg.license, 'MIT AND CC-BY-SA-4.0');
  assert.match(read('REUSE.toml'), /"content\/\*\*"[^\n]*\n[^[]*?SPDX-License-Identifier = "CC-BY-SA-4.0"/);
  assert.match(read('.github/CODEOWNERS'), /^\*\s+@\w/m, 'CODEOWNERS must cover every file');
  assert.match(read('SECURITY.md'), /private vulnerability reporting|security advisories/i);
});

test('README shows the trust badges and they point at this project', () => {
  const readme = read('README.md');
  const repo = 'appfide/oracle-fusion-erp-made-simple';
  for (const [name, badge] of [
    ['OpenSSF Best Practices', /https:\/\/www\.bestpractices\.dev\/projects\/16293\/badge/],
    ['OpenSSF Scorecard', new RegExp(`api\\.scorecard\\.dev/projects/github\\.com/${repo}/badge`)],
    ['REUSE', new RegExp(`api\\.reuse\\.software/badge/github\\.com/${repo}`)],
    ['Release', new RegExp(`actions/workflows/release\\.yml/badge\\.svg`)],
    ['WCAG', /WCAG%202\.2-AA/],
  ]) assert.match(readme, badge, `README has no ${name} badge`);
  for (const doc of ['ROADMAP.md', 'docs/ARCHITECTURE.md', 'docs/ASSURANCE_CASE.md', '#/accessibility']) assert.ok(readme.includes(doc), `README does not link ${doc}`);
});

test('Markdown docs have no broken relative links or leftover placeholders', () => {
  const docs = execFileSync('git', ['ls-files', '*.md'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
  for (const f of ['ROADMAP.md', 'docs/ARCHITECTURE.md', 'docs/ASSURANCE_CASE.md']) if (!docs.includes(f)) docs.push(f);
  let checked = 0;
  for (const f of docs) {
    const src = read(f);
    assert.doesNotMatch(src, /\]\(\{[A-Z]+\}|\{\{[^}]+\}\}|\bTODO\b|\bTBD\b/, `${f}: unfilled placeholder`);
    for (const m of src.matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = m[1].split('#')[0];
      if (!target || /^(https?:|mailto:)/.test(target)) continue;
      checked++;
      assert.ok(existsSync(join(ROOT, f, '..', target)), `${f}: link to ${m[1]} is broken`);
    }
  }
  assert.ok(checked > 20, 'too few relative links found; is the parser broken?');
});

test('CHANGELOG has an entry for the current version', () => {
  assert.match(read('CHANGELOG.md'), new RegExp(`^## \\[${pkg.version.replace(/\./g, '\\.')}\\]`, 'm'), `CHANGELOG.md has no "## [${pkg.version}]" section`);
});

test('every JavaScript file parses', () => {
  const files = ['sw.js', ...readdirSync(join(ROOT, 'assets/js')).map((f) => `assets/js/${f}`), ...readdirSync(join(ROOT, 'scripts')).map((f) => `scripts/${f}`)].filter((f) => /\.m?js$/.test(f));
  for (const f of files) execFileSync(process.execPath, ['--check', join(ROOT, f)], { stdio: 'pipe' });
  assert.ok(files.length >= 12);
});

test('lesson content passes the content validator', () => {
  try {
    execFileSync(process.execPath, [join(ROOT, 'scripts/validate-content.mjs')], { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' });
  } catch (e) {
    assert.fail(`validate-content failed:\n${e.stdout}\n${e.stderr}`);
  }
});

test('curriculum: every lesson file exists, ids are unique and reachable by the router', async () => {
  const { curriculum } = await import(pathToFileURL(join(ROOT, 'content/curriculum.js')));
  const ROUTE_ID = /^[\w-]+$/; // must match the router patterns in assets/js/main.js
  assert.match(read('assets/js/main.js'), /\/\^\\\/lesson\\\/\(\[\\w-\]\+\)\\\/\(\[\\w-\]\+\)\$\//, 'router lesson pattern changed; update this test');
  const modules = new Set();
  const all = new Set();
  for (const m of curriculum) {
    assert.match(m.id, ROUTE_ID, `module id "${m.id}" cannot be routed`);
    assert.ok(!modules.has(m.id), `duplicate module ${m.id}`);
    modules.add(m.id);
    for (const k of ['title', 'short', 'description', 'icon', 'color']) assert.ok(m[k], `module ${m.id} has no ${k}`);
    const slugs = new Set();
    for (const l of m.lessons) {
      assert.match(l.slug, ROUTE_ID, `lesson slug "${l.slug}" cannot be routed`);
      assert.ok(!slugs.has(l.slug), `duplicate lesson ${m.id}/${l.slug}`);
      slugs.add(l.slug);
      all.add(`${m.id}/${l.slug}`);
      const file = `content/lessons/${m.id}/${l.slug}.js`;
      assert.ok(existsSync(join(ROOT, file)), `${file} is missing`);
      const lesson = (await import(pathToFileURL(join(ROOT, file)))).default;
      assert.equal(lesson.title, l.title, `${file}: title differs from curriculum.js`);
      assert.ok(Number.isInteger(lesson.minutes) && lesson.minutes > 0 && lesson.minutes <= 120, `${file}: minutes`);
      const quiz = lesson.blocks.filter((b) => b.type === 'quiz');
      assert.equal(quiz.length, 1, `${file}: should have exactly one quiz`);
      assert.equal(lesson.blocks.at(-1).type, 'quiz', `${file}: the quiz should be the last block`);
      for (const [i, q] of quiz[0].questions.entries()) {
        assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${file}: quiz question ${i + 1} answer index out of range`);
        assert.equal(new Set(q.options).size, q.options.length, `${file}: quiz question ${i + 1} has duplicate options`);
        assert.ok(q.explain, `${file}: quiz question ${i + 1} has no explanation`);
      }
      const urls = (lesson.sources || []).map((s) => s.url);
      assert.ok(urls.length >= 1, `${file}: no sources`);
      for (const u of urls) assert.match(u, /^https:\/\/[^\s"'<>]+$/, `${file}: bad source URL ${u}`);
      assert.equal(new Set(urls).size, urls.length, `${file}: duplicate source`);
    }
  }
  // No orphan lesson files that the curriculum forgot.
  for (const dir of readdirSync(join(ROOT, 'content/lessons'), { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name === 'assets') continue;
    for (const f of readdirSync(join(ROOT, 'content/lessons', dir.name))) {
      if (f.endsWith('.js')) assert.ok(all.has(`${dir.name}/${f.replace(/\.js$/, '')}`), `content/lessons/${dir.name}/${f} is not in curriculum.js`);
    }
  }
});
