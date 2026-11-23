# Design system — Aureum Advocacia

Documented from the built page (index.html, css/style.css). Tokens live in `:root`.

## World

A gilt-tooled legal codex: dark leather fields, gold used only as foil (thin double fillets, small marks, the primary action), stone and paper light sections, clean Montserrat lettering with a Caslon italic voice. Square corners everywhere. No shadows, no gradients except the functional scrim behind the mobile hero photo.

## Color

| Token | Value | Role |
|---|---|---|
| `--ink` | #14100C | Hero, practice index, closing CTA, footer, mobile menu, primary text on light |
| `--ink-raised` | #1D1711 | Hover field on dark rows |
| `--gold` | #D7A042 | Primary button, fillet frames, icons and accents on dark |
| `--gold-deep` | #7A571B | Gold for text, rules and focus on light grounds (AA on paper and stone) |
| `--paper` | #F8F6F2 | Light sections (O Escritório, Equipe), form panel |
| `--stone` | #EFE9DF | Light sections (Diferenciais, Contato) |
| `--warm-grey` | #A8A29B | Secondary text on dark |
| `--muted` | #5A5249 | Secondary text on light |
| `--ink-line` / `--line` | gold 26% / ink 14% | Hairline rules on dark / light |

Rhythm: dark → paper → dark → stone → paper → dark → stone → dark.

## Type

- Display: Montserrat 500 (h1, h2, h3, area names, names, footer titles; logo 600 tracked caps). Hero `clamp(2.2rem…4.4rem)` (max 3.6rem below 1100px), h2 `clamp(1.8rem…2.9rem)`, h3 `clamp(1.2rem…1.5rem)`. Tracking −0.025/−0.012em, `text-wrap: balance`.
- Italic voice: Libre Caslon Text Italic, only for the hero inscription and the pull quote.
- Text/UI: Montserrat variable; body 16px / 1.65; labels 600 weight in sentence case.
- No eyebrow labels above headings; the only tracked caps are the logo's "ADVOCACIA".

## Space and layout

8px scale (`--s-1` 0.5rem … `--s-8` 8rem). Section padding `clamp(4.5rem…9rem)`. 12-column grid, max 1240px, gutter `clamp(1.25rem…4rem)`. Headings left-aligned; only the closing plate is centered.

## Components

- **Double fillet frame**: 1px gold border + inner 1px `--ink-line` border 5–6px inside. Used on hero photo and closing plate. Do not add it elsewhere.
- **Buttons**: square, 52px min height. `.btn--gold` (ink text) and `.btn--ink` (paper text); hover wipes a fill in from the left.
- **Quiet link**: text with a 1px underline that retracts on hover.
- **Practice index**: rows separated by gold hairlines, icon / name / description / affordance; hover lifts the row field and draws a gold underline. Rows link to `#contato` and preselect the form subject.
- **Icons**: inline SVG sprite, 1.25–1.5 stroke, round joins, no fills.
- **Form fields**: square, white, 1px border, ink + gold focus ring; errors in #9B2C1F with text.

## Motion

One load moment in the hero (title/lead/actions rise, photo unveils, frame draws, inscription fades) and a clip reveal for photos as they enter. Ease `cubic-bezier(0.16, 1, 0.3, 1)`. Everything is visible without JS and under `prefers-reduced-motion: reduce`.

## Breakpoints

1200px compact menu + tablet layouts; 860px hero becomes photo-behind-text with frame around the viewport; 720px single column; 480px stacked actions and compact team rows.
