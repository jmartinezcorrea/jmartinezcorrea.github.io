# jmartinezcorrea.github.io

Personal academic website for Julian Martinez-Correa, a third-year PhD student
at the University of Chicago Harris School of Public Policy.

Plain static HTML, CSS and ~80 lines of vanilla JavaScript. No framework, no
build step, no dependencies, no web fonts. Editing means opening a file in a
text editor.

---

## Contents

```
index.html               the entire site (one page, three sections)
assets/css/styles.css    all styling; the THEME block at the top holds every
                         colour, font and size decision
assets/js/site.js        highlights the active tab while scrolling
assets/img/headshot.jpg  profile photo (1000x1333)
files/cv.pdf             the CV linked from the profile
404.html
robots.txt
sitemap.xml
.nojekyll                tells GitHub Pages to skip Jekyll processing
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

## Publish

### Repository URL

The Git remote already points to `jmartinezcorrea/jmartinezcorrea.github.io`,
which matches the canonical site URL `https://jmartinezcorrea.github.io/`.
The older name of the local folder does not affect GitHub Pages and does not
need to be changed.

### Then turn Pages on

1. Commit and push to `main`.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. Branch `main`, folder `/ (root)`. Save.
4. Wait about a minute, then load <https://jmartinezcorrea.github.io/>.

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
contact sentence links the email address and CV. Icon-only links point to GitHub
and X.

### Adding a paper

Copy an existing `<li class="entry">` from the Publications section and edit
it. The full shape is:

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
four current disclosures contain concise, source-checked website summaries,
not verbatim copies of publisher abstract text.

Coauthor links are styled to stay in the body colour with a faint underline, so
a long author list does not turn into a row of loud coloured links.

### Removing a section

If a section is empty, delete two things:

1. the whole `<section id="…">` block in `<main>`, and
2. its `<li>` in the `<nav class="tabs">` list in the header.

The active-tab highlighting adapts on its own.

### Replacing the CV

```bash
cp /path/to/new-cv.pdf files/cv.pdf
```

The link in `index.html` already points at `files/cv.pdf`, so nothing else
changes.

### Replacing the photo

Put the new file at `assets/img/headshot.jpg`. If it is very large, shrink it
first — the display box is about 176px wide, so 1000px is already generous:

```bash
sips --resampleWidth 1000 assets/img/headshot.jpg
```

Then update the `width`/`height` attributes on the `<img>` to the new pixel
dimensions so the browser reserves the right space while loading.

### Metadata

In the `<head>` of `index.html`: `<title>`, `<meta name="description">`, the
`og:` tags, and the JSON-LD `Person` block. Keep `description` and
`og:description` in sync. Update `<lastmod>` in `sitemap.xml` and the `<time>`
element in the footer after a substantial change.

The Working Papers section is currently omitted because the CV and repository
do not contain a working-paper title or abstract. Add the section back only
when real content is available; use the same linked-title and collapsible-
abstract structure shown under "Adding a paper" above.

### Points to double-check against your CV

The publication entries were transcribed from `files/cv.pdf` and then
checked against the published record via DOI. Three details differ from the CV
and were resolved in favour of the published version — revert any you disagree
with:

1. **Early literacy paper — journal name.** CV says *Journal of Public
   Economics*; the article is in ***Journal of Public Economics Plus***, vol 4,
   article 100019 (the volume and article numbers on the CV match Plus).
2. **Early literacy paper — authors.** CV lists Busso and Berlinski; the
   published record also includes **Horacio Álvarez Marinelli** as first
   author, so he is listed and linked to his World Bank profile.
3. **Family Rules — title.** CV says "Nepotism in Mexican Judiciary"; the
   published title is "Nepotism in **the** Mexican Judiciary".

Also worth deciding once and applying everywhere: your name is rendered
**Julian Martinez-Correa** throughout. Your CV heading uses "Julian Martinez
Correa" (no hyphen) and some publisher records use "Julián Martínez Correa"
(accented).

The site describes you as a **third-year PhD student at the University of
Chicago Harris School of Public Policy**. The downloadable CV lists the degree
as "Present," which is consistent with the website.
