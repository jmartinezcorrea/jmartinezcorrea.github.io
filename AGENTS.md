# AGENTS.md

Orientation notes for an AI coding agent picking up this repository with no
prior conversation history. Read this file first; it links out to `README.md`
for step-by-step editing instructions.

## What this is

A one-page personal academic website for **Julian Martinez-Correa**, a PhD
student at the University of Chicago Harris School of Public Policy. Sections:
profile/about, publications, work in progress. Live at
**<https://jmartinezcorrea.github.io/>**, served by GitHub Pages directly from
the `main` branch of this repo, which is public.

There is no backend, no CMS, no build pipeline. The repository *is* the
website.

## Tech stack

Static HTML + CSS + vanilla JS. No framework, no package manager, no
`node_modules`, no build step, no web fonts, no third-party scripts or CDN
dependencies of any kind. Nothing to `npm install`.

- **`index.html`** — the entire page. One file, three `<section>`s.
- **`assets/css/styles.css`** — all styling. A `THEME` block at the very top
  holds every color/font/size decision as CSS custom properties; the rest of
  the file only wires those to elements. Restyle by editing THEME values, not
  by adding new rules.
- **`assets/js/site.js`** (~80 lines) — pure progressive enhancement. It adds
  `aria-current` to the nav tab matching the section in view while scrolling.
  The page is fully navigable and readable with this file blocked or absent:
  the "tabs" are ordinary `#anchor` links to sections that are always in the
  DOM, not a JS-driven single-page-app router.

## Entry points

| File | Role |
|---|---|
| `index.html` | The only page. Edit content here. |
| `assets/css/styles.css` | The only stylesheet. Edit the `THEME` block for visual changes. |
| `assets/js/site.js` | Only touch this for nav/scroll-behavior changes. |
| `files/cv.pdf` | Downloadable CV, linked from the profile section. |
| `assets/img/headshot.jpg` | Profile photo, 1000×1333. |
| `404.html` | Self-contained custom 404 (inlined CSS, no external deps). |

## Preview and verify

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>. No build/watch process — edits to `index.html`
or `styles.css` are visible on refresh.

There is no test suite. When making non-trivial changes, manually check:
horizontal overflow at common widths (390/768/1024/1440), WCAG AA contrast if
touching `--text*`/`--bg` in the THEME block, and that `index.html` stays
well-formed (matched tags, no duplicate `id`s, valid JSON in the `<script
type="application/ld+json">` block).

## Content model

- **Publications** (`<section id="publications">`): each `<li class="entry">`
  has a title linking to the journal's page for that article, an
  `entry__meta` line with coauthor links + venue/status, and a collapsed
  `<details class="entry__abstract">`. Newest first. Coauthor names link to
  their own homepages (verified individually — see README "Points to
  double-check against the CV" for known CV-vs-published-record
  discrepancies).
- **Work in progress**: same entry shape, no abstract yet.
- **CV** (`files/cv.pdf`): linked from the `CV · GitHub · X` row beneath the
  photo (`<ul class="inline-links">`), not from running text. Treat its
  contents as intentionally public — whatever is in that PDF is downloadable
  by anyone visiting the site.
- **Structured data**: a JSON-LD `Person` block in `<head>` carries `sameAs`
  (verified external profile URLs — ORCID, Harris directory, GitHub, X) and
  `alternateName` (name-spelling variants for search). Only add URLs/names
  that are confirmed to belong to Julian Martinez-Correa.

## Deployment

- Remote: `git@github.com:jmartinezcorrea/jmartinezcorrea.github.io.git`
  (**SSH**, not HTTPS — the local machine has no GitHub HTTPS credential
  helper configured; an HTTPS push will fail with a credential error).
- Pushing to `main` deploys automatically via GitHub Pages (no Actions
  workflow, no build). Live within about a minute.
- Repo name matches the GitHub username exactly (`jmartinezcorrea` /
  `jmartinezcorrea.github.io`), which is what makes Pages serve it as a user
  site at the bare domain instead of nesting it under a repo-name path.
- **Known gotcha:** GitHub Pages only serves from a *public* repo on the free
  plan. If the repo is ever made private, Pages silently turns fully off, and
  making the repo public again does not restore it — Settings → Pages source
  must be re-selected manually.

## Conventions

- Everything visual goes through the `THEME` custom-property block in
  `styles.css` — don't hardcode colors/sizes elsewhere in the file.
- Don't add a link, CSS class, or JSON-LD entry without a working target: no
  placeholder `href="#"`, no unstyled classes, no unverified `sameAs` URLs.
  This repo has previously been audited for exactly this (dead CSS rules,
  unstyled classes, broken/blocked outbound links) — keep it that way.
- No inline `style=` attributes; no `!important`.
- Keep the "tabs work as plain anchors without JS" property intact — don't
  convert navigation into a JS-only router.
- Commit messages here have included a `Co-Authored-By:` trailer per whatever
  attribution instruction was active in that session; match the current
  session's instructions rather than copying old commit messages.

## Known issues / caveats

- Git history was **squashed down to a single root commit** (`Academic
  website`, 2026-09) specifically to remove an earlier version of
  `files/cv.pdf` that had a phone number in it; commits since then are normal.
  There is no long history predating that squash to consult for "why was this
  changed" — check this file, `README.md`, and the live site instead.
- The publisher links in Publications (ScienceDirect, Oxford Academic,
  Taylor & Francis, IDB) frequently return `403` to scripted/bot requests
  (`curl`, headless fetchers). This is normal publisher bot-blocking, not a
  broken link — they resolve fine in an actual browser. Don't "fix" these
  without checking in a real browser first.
- Google Search Console is verified for this property via the
  `google-site-verification` meta tag in `index.html`. That tag must stay in
  `<head>` — removing it un-verifies the property on Google's side (an
  external system this repo can't detect or fix from here).
- No working papers are currently listed (removed for lack of real content,
  not lost — see README for how to reintroduce the section).
- No Google Scholar link — the site's owner has explicitly declined to add
  one; don't add it unless asked.

## Likely next steps

- Add real content to a "Working Papers" section when a draft exists (title,
  coauthors, abstract, PDF in `files/`).
- Flesh out the "Human and Political Capital" work-in-progress entry with an
  abstract once available.
- Get an inbound link from the Harris directory profile
  (<https://harris.uchicago.edu/directory/julian-gabriel-martinez-correa>,
  which currently has no outbound link to this site) — this is the highest-
  leverage remaining step for the site to rank for searches of his name, more
  so than any on-page SEO change.
- Confirm Google has indexed the site (Search Console → URL Inspection) and
  request indexing if not.
