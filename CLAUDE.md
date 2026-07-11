# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build        # tsup build → dist/ (cjs + esm + .d.ts, plus dist/cli.js)
npm test              # vitest run (single run)
npm run test:watch    # vitest watch mode
npm run typecheck     # tsc --noEmit
```

Run a single test file: `npx vitest run test/core.test.ts`
Run a single test by name: `npx vitest run -t "renderShape throws on unknown shape"`

Try the CLI locally without publishing:
```bash
npm run build
node dist/cli.js log "Dev Mode" --color cyanBright
```

## Architecture

`any-pattern` is a dual API: a programmatic library **and** a CLI, built from the same pattern data.

- **Pattern data modules** (`src/anyShape.ts`, `src/anyAnimal.ts`, `src/anyMood.ts`) each export a plain `Record<string, string[]>` catalogue (e.g. `shapePatterns`). Adding a new shape/animal/mood is just adding a key to these objects — no other pattern-specific code to touch.
- **`src/anyLog.ts`** is different: it's a bitmap font renderer (`FONT_5x7`), not a static catalogue. `renderPattern`/`logPatterns` rasterize text into a 5x7 pixel banner using `char`/`spacing`/`scale` options.
- **`src/colors.ts`** owns the `Color`/`ColorOption` union, the `COLORS` list, and `styleLines()` — the single place that applies chalk styling or the `rainbow` gradient (which cycles a palette per line, not per character). `render*` functions call this with a color; when color is omitted, output stays plain/uncolored (important for capturing/writing to files).
- **`src/index.ts`** is the composition root: it re-exports pattern catalogues as `shapes`/`animals`/`moods` arrays (via `Object.keys`), defines the `Shape`/`Animal`/`Mood` string-literal unions (must be kept in sync with the pattern object keys), and implements two parallel API surfaces per pattern type:
  - `render*` (e.g. `renderShape`) — pure, returns a string, **throws** on unknown name.
  - `any*` (e.g. `anyShape`) — side-effecting, calls `console.log`, prints a warning instead of throwing on unknown name.
  
  When adding a new pattern type, this pairing (pure render + printing wrapper, throw vs. warn) is the convention to follow.
- **`src/cli.ts`** is a hand-rolled arg parser (no external CLI framework) that maps subcommands (`log`, `shape`, `animal`, `mood`, `list`) onto the `any*` functions from `index.ts`. Flags are extracted destructively via `args.splice` (`extractOption`, `extractBooleanFlag`, `extractListFlag`) before the remaining positional args are read. `random` is a special-cased positional value resolved against the catalogue arrays. `--list`/`-l` works as both a global flag and via the `list` subcommand.
- **Build**: `tsup.config.ts` defines two entries — the library (`src/index.ts`, cjs+esm+dts) and the CLI (`src/cli.ts`, cjs only, with a `#!/usr/bin/env node` banner injected). The CLI's `getVersion()` reads `package.json` via a relative path from the bundled `dist/cli.js`, so it depends on `dist/` and `package.json` staying siblings.

### Adding a new shape/animal/mood
1. Add the key + ASCII art array to the relevant `src/any*.ts` pattern object.
2. Add the name to the corresponding type union (`Shape`/`Animal`/`Mood`) in `src/index.ts`.
3. It's automatically picked up by `shapes`/`animals`/`moods` catalogues, the CLI, and `random` selection.

### Testing conventions
- `test/core.test.ts` covers the pure `render*` API and catalogue/type consistency (every catalogue key renders without throwing).
- `test/index.test.ts` covers the printing `any*` API by spying on `console.log`/`console.warn` and stripping ANSI codes with `strip-ansi` before asserting.
- Rainbow/color assertions force `chalk.level = 3` around the assertion (and restore it after) since chalk disables color in non-TTY test runs by default.
