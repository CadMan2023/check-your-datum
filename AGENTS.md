# CLAUDE.md — The Bridge

The Bridge: the website hub for the trade, the writing, the book, and CADVANTAGE. Repo: `the-bridge`. Domain: checkyourdatum.com. Built with Astro (static, content-first).

This file is law for execution. Read it before touching code. If a request conflicts with a rule here, stop and flag it — do not silently override.

---

## What this is (and is not)

- The Bridge is the **umbrella** — the public site. CADVANTAGE is a **product under it**, built separately and embedded later (Phase 2). Do not pull the React Native app into this repo.
- Static, content-first Astro site. Writing lives as Markdown. Ship raw HTML, keep it fast (zero-JS by default). Reach for an interactive island only when a page genuinely needs it.

## Lanes (do not cross without sign-off)

- **Architecture / structure** belongs to Sophia (Gemini). Framework and structural calls are hers. Astro was her call.
- **Look, brand, voice, copy** belong to Sol (ChatGPT). Do not restyle, rebrand, or write public-facing copy as a side effect of a build. Leave styling minimal until Sol sets it.
- **Execution** is the lane here: scaffold, wire, build the structure as specced. Build the skeleton, not the skin.

## Hard rules — non-negotiable

1. **The public identity is "Thomas Craft."** The author/byline on any public page is Thomas Craft. Travis's legal name NEVER appears in any file, comment, commit, or page. Protect the perimeter.
2. **The five rooms are settled. Do not add, remove, or rename pages without sign-off:**
   - `/` — Home (thesis + one CTA: join the list)
   - `/story` — The Work (the trade, the standard, the why — no legal name)
   - `/writing` — the engine (Markdown content collection)
   - `/cadvantage` — product page (description + screenshots + "try it soon")
   - `/book` — True Your Mind ("what it is / get notified")
- Email capture belongs on every page. The list is the center.
3. **Zero errors before commit.** `npm run build` must succeed clean before anything is committed.
4. **Don't tear out a foundation to patch a fix** (Bees and Orioles). If a change would gut working structure, stop and flag it.

---

## Development

When starting the dev server, use background mode:
astro dev --background
Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)