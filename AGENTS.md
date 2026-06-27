# AGENTS.md — DATUM / CheckYourDatum.com

## Project Identity

This repository is for **DATUM**, the public website/publication system behind **CheckYourDatum.com**.

DATUM is a writing, tools, and maker-philosophy platform rooted in machining, measurement, craft, grief, discipline, and honest self-reference.

This is not a generic motivational brand. It should feel like:

- precision without sterility
- shop-floor truth without blue-collar cosplay
- literary weight without pretension
- practical clarity without hustle-bro nonsense
- a machinist’s notebook turned into a public system

The core idea:

> Start from something true. Measure honestly. Build carefully. Leave it better.

## Brand Hierarchy

Keep this hierarchy clean.

### DATUM

The brand, site, publication, and system.

Use **DATUM** as the primary surface name.

### Check Your Datum

The hook, tagline, and call-to-action phrase.

Use it as the main homepage hero phrase:

> Check Your Datum.

### Thomas Craft

The public author identity.

Use as:

> by Thomas Craft

Thomas Craft is the author/maker voice behind DATUM.

### CADVANTAGE

A secondary tools/product lane.

CADVANTAGE may appear as a subtle project/tool link, not as the main identity of this website.

### CadMan

Private/dev/build handle only.

Do not use CadMan in public-facing homepage copy, nav, hero, metadata, or author identity.

### Michael / Michael Thomas Mitchell

Private foundation layer.

Do not use Michael, Michael Thomas, Michael Thomas Craft, Michael Thomas Mitchell, Travis, or any private/family identity in public-facing UI copy unless the human user explicitly asks for a private memorial/about page later.

The public identity is:

> Thomas Craft

Never use:

> Michael Thomas Craft

## Primary Homepage Stack

Use this stack as the public-facing identity:

DATUM  
Check Your Datum.  
Precision in the shop. Clarity in the mind. Truth in the work.  
by Thomas Craft

## Core Content Lanes

The homepage should organize around these lanes:

### True Your Mind

Philosophy, grief, discipline, mental clarity, self-reference, honest measurement.

### Trade Lessons

Machining, shop wisdom, maker notes, practical lessons from the bench.

### The Dispatch

Field notes, essays, observations, life writing, Haven notes, updates from the work.

### Tools / CADVANTAGE

Practical utilities, tools, machining calculators, and product/project connection.

CADVANTAGE should be secondary and subtle.

## Visual Direction

The visual system should feel like dark precision tooling with literary warmth.

### Primary Mood

- dark steel
- charcoal black
- brushed metal
- dial indicators
- datum targets
- layout grids
- clean typography
- warm amber/copper accent
- restrained parchment surfaces for articles/book/literary elements

### Avoid

- generic gear logos
- fake industrial clutter
- random green accents
- motivational-poster energy
- tech-bro gradients
- overbuilt corporate “four pillar” diagrams
- conspiracy-wall layouts
- public memorial leakage
- fake brand names
- invented company names
- “Michael Thomas Craft”
- making CADVANTAGE the homepage’s main identity

## Logo / Mark Rules

Primary mark:

- datum target
- reticle
- reference point
- alignment/crosshair-style symbol

Use the mark cleanly and minimally.

Secondary mark / mascot:

- octopus may be used as a mastery/support/personality badge
- octopus should not replace the datum mark as the main logo
- octopus should appear in limited places: footer badge, mastery card, merch preview, CADVANTAGE crossover, or small accent

The octopus must match the system:

- minimal
- refined
- not cartoonish
- not mascot-first
- compatible with amber/steel/charcoal palette

## Color Direction

Use tokens or CSS variables.

Suggested palette:

```css
--color-bg: #070808;
--color-surface: #101214;
--color-surface-2: #171a1d;
--color-line: #2a2f34;

--color-text: #f4efe6;
--color-muted: #a7a095;
--color-subtle: #6f756f;

--color-amber: #f0a43a;
--color-copper: #b46a35;
--color-steel: #8d969c;
--color-parchment: #e8dcc6;
```

Keep amber/copper restrained. It should feel like lantern glow, not orange UI spam.

## Typography Direction

Use a strong contrast between technical and literary surfaces.

### Technical / DATUM UI

Use a clean technical sans-serif.

Good examples:

- Inter
- IBM Plex Sans
- Montserrat
- system sans if the repo is kept simple

### Literary / Thomas Craft layer

Use a serif for article headings or author moments.

Good examples:

- Georgia
- Merriweather
- Lora
- Source Serif
- system serif if the repo is kept simple

Do not add external font dependencies unless the repo already has a font strategy. If adding fonts, document where and why.

## Homepage Requirements

Build a real responsive homepage UI.

Do not make a moodboard.  
Do not make a brand board.  
Do not make a strategy diagram.  
Do not create fake lorem ipsum.  
Do not invent extra brands.

Use real page sections.

### Header

Include:

- DATUM logo/wordmark
- nav links:
  - Articles
  - Notes
  - Tools
  - About
  - Subscribe

Header should be clean, dark, precise, and readable.

### Hero

Hero headline:

> Check Your Datum.

Hero subcopy:

> Precision in the shop. Clarity in the mind. Truth in the work.

Author line:

> by Thomas Craft

Primary CTA:

> Start Reading

Secondary CTA:

> Explore Tools

Visual anchor:

- dial indicator
- datum target
- precision measurement feel
- abstracted shop/measuring motif if image assets are not available

If no approved image asset exists in the repo, create the layout so an image can be dropped in later. Use a styled placeholder with clear naming, not random AI art.

### Content Cards

Create three main content cards:

1. True Your Mind  
   Copy: Essays on reference points, grief, discipline, and the work of getting honest.

2. Trade Lessons  
   Copy: Shop-floor notes on machining, craft, mistakes, tolerances, and what the bench teaches.

3. The Dispatch  
   Copy: Field notes from the work, the yard, the tools, and the life around them.

Cards should look like serious editorial/product surfaces, not generic blog cards.

### CADVANTAGE / Tools Block

Create a subtle secondary block:

Title:

> Tools from the Bench

Copy:

> CADVANTAGE and related shop utilities live here: practical tools built from real work, not theory alone.

CTA:

> View Tools

Do not make this the main hero.

### Newsletter Block

Title:

> Get the Bench Notes

Copy:

> Short dispatches on craft, clarity, tools, and the work of checking your datum.

CTA:

> Subscribe

No backend integration required unless one already exists. A static form is acceptable for now.

### Footer

Footer should include:

- DATUM
- Check Your Datum.
- by Thomas Craft
- small nav links
- subtle octopus/mastery badge if appropriate
- no private names

## Technical Work Rules

Before editing:

1. Inspect the repo structure.
2. Identify framework, package manager, and existing conventions.
3. Check current git status.
4. Do not overwrite existing work without explaining why.
5. Prefer small, coherent edits over broad rewrites.

Expected framework: Astro, unless the repository proves otherwise.

If Astro is present, prefer:

- `src/pages/index.astro`
- `src/layouts/`
- `src/components/`
- `src/styles/`
- CSS variables for theme tokens

If Tailwind is already installed and used, follow existing Tailwind conventions.

If Tailwind is not installed, do not add it just for this task.

Do not add production dependencies unless absolutely necessary.

## Scope for First Long Pass

Implement only:

1. Homepage UI
2. Shared layout if needed
3. Theme/style tokens
4. Reusable components needed by the homepage
5. Responsive behavior
6. Basic metadata for the homepage

Do not implement:

- CMS
- authentication
- payments
- database
- user accounts
- full blog engine
- newsletter backend
- app-store pages
- CADVANTAGE product system
- legal entity pages
- private memorial pages
- AI-generated content pipeline

Keep the work bounded.

## File-Touching Guidance

Prefer to touch only files needed for the homepage.

Likely allowed files:

- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro` or equivalent
- `src/components/*`
- `src/styles/*`
- `src/assets/*` only if existing assets need organizing
- package/config files only if required by existing repo conventions

Avoid touching:

- lockfiles unless dependencies change
- unrelated pages
- unrelated config
- deployment settings
- environment files
- private notes
- archived docs

## Copy Rules

Use exact public copy unless the user asks for variations.

Approved public copy:

- DATUM
- Check Your Datum.
- Precision in the shop. Clarity in the mind. Truth in the work.
- by Thomas Craft
- True Your Mind
- Trade Lessons
- The Dispatch
- Tools from the Bench
- Get the Bench Notes
- Start Reading
- Explore Tools
- View Tools
- Subscribe

Do not invent private biography.

Do not use Michael publicly.

Do not use Travis publicly.

Do not use CadMan publicly.

Do not turn the site into a personal memorial page.

## Design Quality Bar

The homepage should feel polished enough that a visitor immediately understands:

- this is a serious publication
- it comes from a real maker/tradesman perspective
- it is about precision as both technical practice and mental/spiritual reference
- the author has depth without overexplaining himself

Make it clean, grounded, and buildable.

Use spacing generously.

Use borders, subtle grids, and glow effects sparingly.

Avoid clutter.

The strongest visual anchor is:

> datum target + dial indicator + amber lantern glow + dark steel

## Responsive Requirements

Make the homepage work on:

- mobile
- tablet
- desktop

Mobile should not feel like an afterthought.

Header/nav may collapse or stack simply if no menu system exists.

Hero should remain readable.

Cards should stack cleanly.

No horizontal scroll.

## Accessibility Requirements

Use semantic HTML where possible.

Use readable contrast.

Buttons and links must be keyboard/focus visible.

Images need alt text.

Do not put essential copy only inside decorative images.

## Testing / Verification

After changes:

1. Run install only if dependencies are missing.
2. Run the existing dev/build/lint commands from package scripts.
3. At minimum, run the project build command if available.
4. Report what commands were run and whether they passed.
5. Report every file changed.
6. Summarize what was implemented.
7. List any unresolved issues or recommended next steps.

Do not claim success if build/test did not run.

If a command fails, capture the error and explain the likely cause.

## Handoff Report Format

At the end of the task, provide:

### Summary

What was built.

### Files Changed

List changed files.

### Commands Run

List commands and results.

### Brand Compliance Check

Confirm:

- DATUM is primary brand
- Check Your Datum is the hook
- Thomas Craft is the author
- CadMan is not public-facing
- Michael/private names are not public-facing
- CADVANTAGE is secondary
- Octopus is secondary/support only

### Next Best Step

Recommend one next small task.

## Working Agreement

One active code agent at a time.

Do not assume Claude Code or another agent’s pending edits are safe to overwrite.

If the working tree is dirty at the start, inspect and summarize before editing.

The human user owns the repo.

Design direction comes from Sol.

Architecture direction may come from Sophia.

Implementation may be done by Codex or Claude Code, but only one active hand touches the repo at a time.

When uncertain, choose the smaller, safer edit.
## Repo-Specific Commands

