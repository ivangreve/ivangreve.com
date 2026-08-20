# Company marks

Square marks for the experience rail, rendered in a 30px tile.

Present: `cookunity.webp`, `agree.webp`, `axum.webp` — all 120×120, which covers
the tile at 4x. Kelawar has none on purpose (see below), so its row falls back to
the company initial.

To add one, drop the file here and point the job at it in **both**
`src/data/en.ts` and `src/data/es.ts`:

    { company: 'CookUnity', logo: '/logos/cookunity.webp', ... }

Omit `logo` and the tile renders the initial instead. A path that 404s also falls
back to the initial — the image removes itself on error — so a typo degrades
quietly rather than leaving a blank square in the row.

## Rules

- **Square only**, 120px or larger.
- Judge the mark at **30px**, not at the size you downloaded it. Resize to 30 and
  look before committing.

## Where these came from

LinkedIn's public company pages. The `og:image` on each is a 200×200 square:

    curl -s https://www.linkedin.com/company/<slug> | grep -o 'og:image[^>]*'

Slugs used: `cookunity`, `agree-ag`, `axum-sistemas-inteligentes-srl`.

Company sites were checked first and are not usable: CookUnity serves a 131×28
wordmark, Agree.Ag an 803×245 one, and no site answers the conventional
`apple-touch-icon.png` / `android-chrome-*.png` paths. Favicons top out at 48px,
128px and 16px respectively. Clearbit, unavatar and DuckDuckGo's icon services
all just mirror those same favicons.

Kelawar's mark is a fine-grained bat-and-network illustration. At 30px it is a
grey smear, so its row keeps the initial.

## Never guess a domain

`kelawar.com` belongs to an unrelated digital marketing agency. Pulling its
favicon would have put a stranger's logo beside a co-founder role. Confirm the
entity — LinkedIn company pages are tied to the actual employment record, which
is why they are the source here.
