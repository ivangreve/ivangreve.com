# Company marks

Drop a **square** company mark here and point the job at it in
`src/data/en.ts` and `src/data/es.ts`:

    { company: 'CookUnity', logo: '/logos/cookunity.webp', ... }

Without a `logo`, the tile renders the company's initial. That fallback is the
default on purpose: a missing file is worse than no logo, and a *wrong* logo is
worse than both.

## Rules

- **Square only.** Every one of these companies publishes a horizontal
  wordmark. At the 30px the tile renders, a wordmark is an illegible smudge.
  Use the square app-icon version — the one LinkedIn shows next to the role.
- **120px or larger**, for 3x displays.
- `.webp` or `.png`. Transparent background preferred; the tile supplies its own.

## Where to get them

The square versions exist on each company's LinkedIn page, and on the
experience entries of linkedin.com/in/ivan-greve. Save them from there.

Official sites only publish wordmarks and small favicons — checked: CookUnity
serves a 48px `.ico`, Agree.Ag a 128px favicon, and axumvm.com.ar only 16px.

Kelawar's mark is a fine-grained dot-network illustration; it turns to mush at
30px, so it is better left as its initial. Metalúrgica Vezeta has no mark at
all — its domain no longer resolves.

**Never** fetch a favicon by guessing the domain. `kelawar.com` belongs to an
unrelated digital marketing agency, and using it would have put a stranger's
logo beside a co-founder role.
