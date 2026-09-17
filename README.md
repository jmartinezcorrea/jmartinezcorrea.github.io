# jmartinezcorrea.github.io

Personal academic website for Julian Martinez-Correa, a PhD student at the
University of Chicago Harris School of Public Policy. One page: profile,
publications, work in progress.

Live at **<https://jmartinezcorrea.github.io/>**.

Plain static HTML, CSS and ~80 lines of vanilla JavaScript. No framework, no
build step, no dependencies, no web fonts, no external network requests.
Editing means opening a file in a text editor.

> **For an AI agent picking this up with no prior context:** read
> [`AGENTS.md`](AGENTS.md) first. It covers repo conventions, known issues,
> and pending work in more operational detail than this file.

---

## Contents

```
index.html               the entire site (one page, three sections)
assets/css/styles.css    all styling; the THEME block at the top holds every
                          colour, font and size decision
assets/js/site.js        highlights the active tab while scrolling
assets/img/headshot.jpg  profile photo (1000x1333)
files/cv.pdf             the CV linked from the profile
404.html                 custom not-found page (self-contained, inlined CSS)
robots.txt
sitemap.xml
.nojekyll                 tells GitHub Pages to skip Jekyll processing
AGENTS.md                 orientation notes for an AI agent continuing this project
```

---

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Stop with `Ctrl-C`.

Opening `index.html` by double-clicking also works, but the local server is
closer to how GitHub Pages actually serves the site.

---

## Publish / deployment

The repository **is** the deployment: GitHub Pages serves `main` directly,
with no build step.

- **Remote:** `git@github.com:jmartinezcorrea/jmartinezcorrea.github.io.git`
  (SSH — the account has no HTTPS credential helper configured).
- **Repo:** public. The name matches the GitHub username exactly, so Pages
  serves it as a *user* site at the bare `https://jmartinezcorrea.github.io/`
  (no repo-name path segment).
- **Pages settings:** Settings → Pages → Source: *Deploy from a branch* →
  `main` / `/ (root)`. Already configured and live.
- Push to `main` → Pages rebuilds automatically, usually within about a
  minute.

**If Pages ever stops serving:** GitHub Pages only publishes from a public
repo on the free plan. If the repo is ever made private, Pages is switched
off entirely — not just paused — and making the repo public again does
**not** turn it back on. Re-enable it manually under Settings → Pages.

---

## Changing the look

Everything visual is a CSS custom property in the `THEME` block at the top of
`assets/css/styles.css`. Change values there; the rest of the file only wires
them to elements and should rarely need editing.

| Want to change | Variable |
|---|---|
| Accent colour (links, active tab) | `--accent`, `--accent-deep`, `--accent-wash` |
| Page background / text colour | `--bg`, `--text`, `--text-muted`, `--text-faint` |
| Body typeface | `--font-body` (set it to `var(--font-sans)` for an all-sans site) |
| Nav and label typeface | `--font-ui` |
| Base text size | `--size-base` |
| Name size, paper-title size | `--size-h1`, `--size-entry-title` |
| Page width / text column width | `--wrap`, `--measure` |
| Space between sections | `--section-gap` |
| Photo size | `--photo-width`, `--photo-width-mobile` |
| Photo shape and crop | `--photo-aspect`, `--photo-position`, `--photo-radius` |
| Social icon row alignment | `--social-align` (`flex-start` = left-aligned under photo, `center` = centred) |
| Tab shape | `--radius-pill` (use `4px` for square-ish tabs) |

The THEME block includes three ready-made alternative accent palettes as
comments.

Two cautions:

- After changing `--text*` or `--bg`, re-check contrast. Body text needs at
  least 4.5:1 against the background, and `--text-faint` is used at ~13px so it
  needs 4.5:1 too. <https://webaim.org/resources/contrastchecker/>
- `--photo-position` is what to keep when the photo is cropped to
  `--photo-aspect`. It is currently `50% 30%`, which favours the upper part of
  the frame. Lower the second number to show more of the top.

---

## How to edit the content

### The bio and contact links

Both are in `<section id="about">` near the top of `index.html`. The bio covers
the PhD program, research interests, prior IDB experience and degrees. The
contact sentence links the email address and CV. Below the photo, two
icon-only links point to GitHub and X.

### Adding a paper

Copy an existing `<li class="entry">` from the Publications section and edit
it. The full shape:

```html
<li class="entry">
  <h3 class="entry__title">
    <a href="https://journal.example/article">Title of the paper</a>
  </h3>
  <p class="entry__meta">
    <span class="entry__authors">with
      <a href="https://coauthor-site.com/">Coauthor Name</a> and
      <a href="https://other-site.com/">Other Coauthor</a></span>
    <span class="entry__status">Journal Name, 2026, 12(3), 45&ndash;67</span>
  </p>
  <details class="entry__abstract">
    <summary>abstract</summary>
    <p>Abstract text.</p>
  </details>
</li>
```

Authors and status are optional. Every publication keeps its abstract in a
collapsed disclosure, and the title itself links to the article's journal
webpage. Order is simply the order the `<li>` elements appear in; Publications
is currently newest first.

Use abstract text you authored or otherwise have permission to republish. The
four current disclosures are concise, source-checked website summaries — not
verbatim publisher abstract text.

Coauthor links are styled to stay in the body colour with a faint underline, so
a long author list does not turn into a row of loud coloured links. Link each
coauthor to their own homepage, not a journal profile page.

### Removing or adding a section

To remove: delete the whole `<section id="…">` block in `<main>`, and its
`<li>` in the `<nav class="tabs">` list in the header. The active-tab
highlighting in `site.js` adapts automatically — it reads the nav at runtime,
nothing there is hardcoded to specific section ids.

To add one back (e.g. Working Papers): use the same linked-title,
`entry__meta`, collapsible-abstract structure shown under "Adding a paper"
above, plus a matching `<li>` in the header nav.

### Replacing the CV

```bash
cp /path/to/new-cv.pdf files/cv.pdf
```

The link in `index.html` already points at `files/cv.pdf`, so nothing else
changes. Check the new file for personal data you don't want published (phone
number, ID numbers) before committing — whatever is in `files/cv.pdf` becomes
publicly downloadable the moment it's pushed.

### Replacing the photo

Put the new file at `assets/img/headshot.jpg`. If it is very large, shrink it
first — the display box is about 176px wide, so 1000px is already generous:

```bash
sips --resampleWidth 1000 assets/img/headshot.jpg
```

Then update the `width`/`height` attributes on the `<img>` to the new pixel
dimensions so the browser reserves the right space while loading.

### Metadata and structured data

In the `<head>` of `index.html`: `<title>`, `<meta name="description">`, the
`og:` tags, and the JSON-LD `Person` block. Keep `description` and
`og:description` in sync. Update `<lastmod>` in `sitemap.xml` and the `<time>`
element in the footer after a substantial content change.

The JSON-LD `Person` block carries `sameAs` (verified profile URLs only —
currently ORCID, the Harris directory page, GitHub, X) and `alternateName`
(name spelling variants people search for). Extend both only with links and
spellings that are actually his.

**Do not remove** the `google-site-verification` meta tag in `<head>` — it
verifies domain ownership in Google Search Console. Removing it un-verifies
the property there.

### Points to double-check against the CV

Publication entries were transcribed from `files/cv.pdf` and checked against
the published record via DOI. Three details differ from the CV and were
resolved in favour of the published version:

1. **Early literacy paper — journal name.** CV says *Journal of Public
   Economics*; the article is in ***Journal of Public Economics Plus***, vol 4,
   article 100019.
2. **Early literacy paper — authors.** The published record includes
   **Horacio Álvarez Marinelli** as first author, not listed on the CV.
3. **Family Rules — title.** Published title is "Nepotism in **the** Mexican
   Judiciary" (CV omits "the").

The site renders the name as **Julian Martinez-Correa** throughout (his CV
heading omits the hyphen; some publisher records use accented
"Julián Martínez Correa" — the JSON-LD `alternateName` list covers these
variants for search purposes without changing the visible text).
