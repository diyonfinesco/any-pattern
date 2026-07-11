# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install              # install deps
npm run build             # tsup -> dist/ (cjs, esm, d.ts, plus bundled CLI)
npm test                  # vitest run (all tests, single pass)
npm run test:watch        # vitest watch mode
npm run typecheck         # tsc --noEmit
```

Run a single test file: `npx vitest run test/core.test.ts`
Run a single test by name: `npx vitest run -t "renderShape"`

`prepublishOnly` runs `npm run build`, so `npm publish` always rebuilds `dist/` first — never hand-edit `dist/`.

Try the CLI locally without publishing:
```bash
npm run build
node dist/cli.js log "Dev Mode" --color cyanBright
```

## Architecture

This is a dual-surface package: the same pattern catalogues power both a programmatic API (`src/index.ts`) and a CLI (`src/cli.ts`). `tsup.config.ts` builds two separate bundles — `src/index.ts` (cjs+esm+dts) and `src/cli.ts` (cjs only, with a `#!/usr/bin/env node` banner injected at build time, not present in source).

**Pattern catalogues** (`src/anyShape.ts`, `src/anyAnimal.ts`, `src/anyMood.ts`) are plain `Record<string, string[]>` objects — each key is a lowercase name, each value is the ASCII art as an array of lines. Adding a new shape/animal/mood means: add an entry to the catalogue object, then add the matching literal to the corresponding union type (`Shape`/`Animal`/`Mood`) in `src/index.ts`. The catalogue's `Object.keys()` (exported as `shapes`/`animals`/`moods`) drives both CLI tab-completion-style listing (`list shapes`) and the `random` picker — no separate registry to update.

**Banner text** (`anyLog`/`renderLog`) works differently: it's not a catalogue but a bitmap font. `src/anyLog.ts` defines `FONT_5x7`, a 5x7 bitmap per character (`A-Z`, `0-9`, space, punctuation) encoded as 7 rows of 5-bit integers (`0b01110` etc). `renderPattern` walks each character's rows, expands bits to `char`/space strings, and joins glyphs horizontally with `spacing` and vertically scales with `scale`. Unknown characters fall back to the `UNKNOWN` glyph (a box shape) rather than throwing.

**Two-tier API pattern**: every pattern type has a pure `render*` function (returns a string, throws on unknown name, no console access — used by tests and for capturing output) and a side-effecting `any*` wrapper (calls the `render*` equivalent, `console.log`s the result, and catches the throw to print a `⚠️` warning instead of crashing). When adding a new renderer, follow this pair pattern rather than only adding the printing version.

**Coloring** (`src/colors.ts`) is applied at the render layer via `styleLines`, not baked into the patterns. Passing no color returns lines untouched (plain, diffable, safe for non-TTY output) — this is what tests rely on to assert against raw ASCII without stripping ANSI codes. `"rainbow"` is not a real chalk color; it's a special `ColorOption` that cycles `RAINBOW_PALETTE` per line.

**CLI argument parsing** (`src/cli.ts`) is hand-rolled, not a library — `extractOption`/`extractBooleanFlag`/`extractListFlag` mutate the `args` array in place (splicing out consumed flags) so remaining positional args can be read off cleanly afterward. `--list`/`-l` is special-cased as a global flag usable before or instead of the `list` subcommand.

**Version resolution**: the CLI's `--version` reads `package.json` at runtime via a relative path from `__dirname` (`dist/cli.js` -> `../package.json`), since the bundled CLI has no build-time access to the version string.
