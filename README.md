# ivangreve.com

Personal site and résumé. Astro, TypeScript, no framework runtime.

Replaces the previous Nuxt 2 site, whose content stopped at 2021 and whose stack
(Nuxt 2, `node-sass`, Pug) no longer installs on a current Node.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
```

```bash
npm run build     # static output in dist/
npm run preview   # serve the built output
npm run check     # astro check — types across .astro and .ts
npm run contrast     # WCAG audit of the colour tokens; non-zero exit on failure
npm run print-check  # build, then fail if the printed résumé is no longer 3 pages
npm run og           # redraw public/og.png (macOS — uses the system SF Pro)
```

---

## How it is put together

```
src/
├── data/
│   ├── types.ts   ← the shape of a résumé
│   ├── en.ts      ← English content
│   └── es.ts      ← Spanish content
├── components/    ← one per section, all take `data: ResumeData`
├── layouts/
│   └── Base.astro ← head, meta, hreflang, JSON-LD, theme script
├── styles/
│   └── global.css ← tokens, layout, print stylesheet
└── pages/
    ├── index.astro     → /      (English)
    └── es/index.astro  → /es/   (Spanish)
```

**All content lives in `src/data/`.** To update the résumé you edit `en.ts` and
`es.ts` — nothing else. Both must satisfy `ResumeData`, so adding a field in one
language fails `npm run check` until the other catches up. That is the point: it
is the only thing stopping the Spanish version from quietly rotting, which is
exactly how the previous site died.

The components are dumb. They take `data` and render it. There is no content in
any `.astro` file.

---

## Decisions worth knowing

**Astro, not Next.** Two static pages with no client state. Astro ships zero JS
by default and that is the whole requirement.

**No JavaScript bundle.** `dist/` contains 0 KB of bundled JS. The two scripts
that exist — the theme toggle and the top-bar scroll observer — are inlined in
the HTML by `is:inline`. The theme is read from `localStorage` in `<head>` before
first paint, so a dark-theme visitor never sees a white flash.

**No web fonts.** System font stack. Nothing to download, nothing to block
rendering, no layout shift.

**The print stylesheet is a real view, not a courtesy.** `Cmd+P` on either page
produces a three-page A4 résumé: nav, buttons, project images and the footer drop
out; the date rail narrows; links are replaced by spelled-out addresses under the
header, because paper cannot be clicked.

Nothing on screen tells you when that view grows a fourth page — the document
just gets longer — so `npm run print-check` prints the built site through
headless Chrome and fails if the count moves. It was verified by regression:
injecting 26 extra bullets takes English to 4 pages and the check exits 1.
Injecting 6 does not, so there is roughly half a dozen bullets of slack in hand
before the layout tips.

**`<h1>` says "Frontend Engineer".** Over the 90 days to August 2026, "Frontend
Engineer" appeared in 36% of postings requiring frontend skills; "Product
Engineer", while a real title, is concentrated in a narrow band of product-led
startups. The product-engineering framing lives in the intro paragraph instead,
so the keyword and the narrative both land.

**JSON-LD `Person` schema** in `Base.astro` — the machine-readable copy of the
same résumé, for search engines and recruiter tooling.

**Contrast is measured, not eyeballed.** `npm run contrast` parses the tokens out
of `global.css` and checks every foreground/background pair that ships. It passes
today; it exits non-zero the moment it doesn't. Two deliberate calls are baked in:
`--text-faint` is held to 4.5:1 because it carries the date rail — when someone
worked somewhere is a load-bearing fact, not decoration — while `--border` stays
quiet, because a card outline identifies no control and gates no content, so
WCAG 1.4.11's 3:1 doesn't apply to it. `--border-interactive`, which outlines the
buttons, does clear 3:1.

**`public/og.png` is drawn by `scripts/make-og-image.py`**, not exported from a
design tool, so it stays in step with the palette. It reads
`public/portrait-400.webp`, so replacing the photo means re-running `npm run og`
too. Regenerate it after changing the name, role, headline chips or portrait.

**Every icon lives in `Icon.astro`.** They used to be inlined at each call site,
which meant the external-link arrow existed in two files and the envelope in two
more. Adding one there is now the only way to add one. Which icon a link gets is
decided by `iconForHref` in `src/lib/icons.ts`, keyed on the destination rather
than the label — labels are translated ("Live" / "En vivo"), URLs are not.

**Company marks come from LinkedIn's public company pages.** Each one's
`og:image` serves a 200×200 square — the shape a tile needs. Every company site
checked publishes only a horizontal wordmark (CookUnity's is 131×28, Agree.Ag's
803×245) or a small favicon, and a wordmark at 30px is an illegible smudge.

    curl -s https://www.linkedin.com/company/<slug> | grep -o 'og:image[^>]*'

Kelawar's mark is a fine-grained bat-and-network illustration. Rendered at the
real 30px and inspected, it is a grey smear, so that row keeps its initial —
which is what the initial fallback is for. Judge a mark at the size it will
actually be drawn, not at the size you downloaded it.

Do **not** fetch a favicon by guessing a domain. `kelawar.com` belongs to an
unrelated digital marketing agency; using it would have put a stranger's logo
beside a co-founder role. Verify the entity before you use its mark.

**Never link to a private repository.** Of the four projects, only `solar-fs` is
public — SnowRide, Contapp and Agro Alerta are all closed. A "GitHub" link on a
private repo 404s for every visitor, which reads worse than no link at all, so
those cards carry a plain `privateSource` marker instead. If a repo is opened
later, drop the flag and add the link. Check before you link:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://api.github.com/repos/ivangreve/<repo>
```

**The skills section leads with the headline stack.** React, React Native,
Angular, TypeScript, Next.js and Node.js render with weight and an accent tint;
everything else stays quiet. Hierarchy first — forty identical grey chips
emphasise nothing, and animating them all equally emphasises nothing either. The
set lives in `Skills.astro`, not in the content files, because product names are
the same string in both languages so there is nothing to keep in sync.

The chips fade up in sequence as each group scrolls in. The hidden resting state
is scoped to `html.js`, so no-JS, reduced-motion and print all fall back to plain
visible text — and print additionally forces them visible with `!important`,
because printing does not scroll and an unrevealed group would otherwise come out
as blank space. All four paths were exercised, not assumed: no-JS resolves to
opacity 1, the reduced-motion override sits after the hiding rule in the cascade
(CSSOM index 84 vs 79, same specificity, so later wins), and the PDF was read
back to confirm every chip prints.

Do not add a `beforeprint` hook that reveals the groups. It was tried and
removed: setting `data-revealed` at print time starts the 450ms transition, and
the dialog can capture a chip mid-fade at around 0.1 opacity. The print
stylesheet's `!important` resolves instantly and needs no scripting.

**The portrait is on the site but not on the PDF.** On a personal page a photo is
normal; on a résumé it is a liability, since plenty of US and UK screens discard
or anonymise CVs that carry one. One rule in the print block controls it — delete
it to print the photo.

**Section labels are defined once.** `sections.*` supplies both the heading above
a section and its label in the top-bar nav, so the two cannot drift apart. That
constraint is also why the projects heading reads "Projects" and not "Selected
projects" — a nav item has to be short, and one honest label beats two labels
that can disagree.

**The scroll spy has a tail case worth keeping.** The last section starts below
the furthest the page can scroll, so it can never reach the observer's detection
band on its own. Without the explicit bottom-of-page override in `Base.astro`,
"Contact" would be permanently unreachable and the previous section would hold
the highlight at the very bottom. Verified by sweeping the whole scroll range and
checking each nav item owns a contiguous span with exactly one ever marked.

**Screen-reader details that are not visible on screen.** Three project cards
each carry a link labelled "GitHub"; pulled up in a screen reader's link list
they were indistinguishable, so a `.sr-only` span names the project each one
belongs to. Every link that opens a new tab says so the same way. The language
switch carries `lang=` as well as `hreflang=`, so "Español" sitting in an English
page is pronounced as Spanish rather than read with English phonetics. None of
this reaches the printed PDF — `.sr-only` clips to a 1px box, which paper honours
too, and that was checked rather than assumed.

**No analytics, no trackers, no cookie banner.** Nothing to consent to.

---

## Content sources

Experience, dates and titles come from
[linkedin.com/in/ivan-greve](https://www.linkedin.com/in/ivan-greve/) and should
be kept in step with it. Projects come from their own repositories. No metrics
are stated that are not backed by one of those two.

---

## Deploying

Static output — any host will do. `dist/` after `npm run build`.

The domain currently resolves through Fastly. Point it at wherever this ends up
(Vercel, Netlify, Cloudflare Pages, GitHub Pages) and set the build command to
`npm run build` with output directory `dist`.
