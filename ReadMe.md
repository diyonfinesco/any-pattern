# any-pattern

[![npm version](https://img.shields.io/npm/v/any-pattern.svg?style=for-the-badge&color=blue)](https://www.npmjs.com/package/any-pattern)
[![npm downloads](https://img.shields.io/npm/dt/any-pattern.svg?style=for-the-badge&color=brightgreen)](https://www.npmjs.com/package/any-pattern)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)


Turn plain terminal output into colourful ASCII art. `any-pattern` ships with banners, shapes, animals, and moods that you can render from code **or** directly from the command line.

A modern, typed take on the `figlet`/`cowsay` niche — with rainbow gradients, shapes, animals, moods, and a pure `render*` API alongside the printing helpers.

**Try it now — no install:**

```bash
npx any-pattern shape heart --rainbow
```

<p align="center">
  <img width="600" height="200" alt="logo" src="https://github.com/user-attachments/assets/87361a67-31db-47bb-9acc-2d9030427608" />
</p>

## Highlights
- **print** helpers (`anyLog`, `anyShape`, `anyAnimal`, `anyMood`) **and pure `render*` functions** that return a string — capture it, write it to a file, or embed it anywhere
- 🌈 **rainbow** gradient colouring in addition to 16 chalk colours
- banner font with **letters, numbers, and punctuation** (`! ? . , - + = : ' / ( ) < > * #`)
- interactive CLI (`npx any-pattern`) with `--list`, `--version`, `--rainbow`, and `random` picks
- works with CommonJS, ESM, and TypeScript projects (strict union types → autocomplete)
- tree of ASCII assets you can extend or customise

## Demo

<!--
TODO(demo gif): record a short terminal session (e.g. `npx any-pattern shape heart --rainbow`,
then an `anyLog` banner and a `mood`), export as a GIF, upload it to a GitHub issue/PR comment
to get a persistent user-attachments URL, and replace the placeholder src below.
An autoplaying GIF at the top of the README converts far better than static screenshots.
-->
<p align="center">
  <img width="600" alt="any-pattern demo" src="https://via.placeholder.com/600x300?text=Record+a+demo+GIF+and+drop+the+URL+here" />
</p>

### Screenshots

<img width="787" height="894" alt="Screenshot 2025-11-04 at 11 34 42" src="https://github.com/user-attachments/assets/5b6bb32c-db9d-411f-854d-653b5f8120b8" />


<img width="725" height="204" alt="Screenshot 2025-11-04 at 11 35 03" src="https://github.com/user-attachments/assets/18aa78e1-e323-4ccb-8c53-0997fce90a3e" />

## Installation

```bash
npm install any-pattern
# or
yarn add any-pattern
# or
pnpm add any-pattern
```

The CLI can be invoked without installing globally:

```bash
npx any-pattern --help
```

## Quick Start

```ts
import { anyLog, anyShape, anyAnimal, anyMood } from 'any-pattern';

anyLog('Hello!', 'cyanBright', { char: '#', spacing: 2 });
anyShape('heart', 'rainbow');   // 🌈 gradient
anyAnimal('cat', 'yellow');
anyMood('cool', 'blue');
```

`Color` is a strict union, so you get autocomplete and type checking in TypeScript-aware editors.

### Capture instead of print

Every `any*` function has a pure `render*` counterpart that **returns a string** and never touches the console — ideal for tests, log files, web output, or composing larger layouts. Pass a colour to embed ANSI codes, or omit it for plain text.

```ts
import { renderLog, renderShape, renderMood, shapes, moods } from 'any-pattern';

const banner = renderLog('Build OK', { scale: 1 });   // plain string, no colour
fs.writeFileSync('banner.txt', banner);

const colored = renderShape('star', 'rainbow');        // string with ANSI colour
process.stdout.write(colored + '\n');

// catalogues are exported for menus / random pickers
console.log(shapes.length, moods.length);
```

`render*` throws on an unknown name; the `any*` helpers print a warning instead.

## CLI Usage

```bash
npx any-pattern log "v2.0!" --color magentaBright --spacing 1 --scale 2
npx any-pattern shape heart --rainbow          # 🌈 gradient
npx any-pattern animal random                  # surprise me
npx any-pattern mood laughing --color yellowBright
npx any-pattern --version
npx any-pattern --list shapes                  # works as global flag
npx any-pattern list animals                   # traditional sub-command
```

### Supported commands
- `log <text>` – render banner text (options: `--color`, `--char`, `--spacing`, `--scale`)
- `shape <name|random>` – draw a geometric pattern
- `animal <name|random>` – print an ASCII critter
- `mood <name|random>` – show an emoji-style face
- `list <shapes|animals|moods|colors>` – inspect what is bundled (also available via `--list`/`-l`)

### Global flags
- `--color, -c <color>` – any colour name (default `white`)
- `--rainbow` – rainbow gradient, overrides `--color`
- `--version, -v` – print the installed version
- `--help, -h` – show usage

Pass `random` in place of any shape/animal/mood name to pick one at random. Run `any-pattern --help` to see all flags in context.

## API Reference

### Print helpers (write to the console)

| Function | Returns | Notes |
| --- | --- | --- |
| `anyLog(text, color?, options?)` | `void` | Banner text via the built-in 5×7 font |
| `anyShape(shape, color?)` | `void` | Prints a shape + trailing blank line |
| `anyAnimal(animal, color?)` | `void` | Prints an animal + trailing blank line |
| `anyMood(mood?, color?)` | `void` | Emoji-style face (not bolded); defaults to `smiley` |

### Pure render functions (return a string)

| Function | Returns |
| --- | --- |
| `renderLog(text, options?, color?)` | `string` |
| `renderShape(shape, color?)` | `string` |
| `renderAnimal(animal, color?)` | `string` |
| `renderMood(mood?, color?)` | `string` |

`render*` functions are side-effect free. Omit the colour for plain text; pass a `ColorOption` to embed ANSI codes. They **throw** on an unknown name.

**`anyLog` / `renderLog` options**
- `char` (`string`, default `*`): character used for filled pixels
- `spacing` (`number`, default `2`): gap between glyphs
- `scale` (`number`, default `1`): scales glyph width/height uniformly

The font covers `A–Z`, `0–9`, space, and punctuation `! ? . , - + = : ' / ( ) < > * #`. Names are case-insensitive.

### Catalogue exports

`shapes`, `animals`, `moods`, and `COLORS` are exported as arrays — handy for building menus or random pickers.

### Colours

Any of the Chalk v4 palette, plus the special `rainbow` gradient:

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `blackBright`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`, `rainbow`

## Pattern Catalogue

### Shapes
`arrow`, `arrow down`, `arrow up`, `circle`, `cross`, `diamond`, `downward triangle`, `heart`, `hexagon`, `hollow circle`, `hollow diamond`, `hollow pyramid`, `hollow square`, `hollow triangle`, `hourglass`, `infinity`, `left arrow`, `left triangle`, `octagon`, `oval`, `pentagon`, `plus`, `pyramid`, `reversed pyramid`, `right arrow`, `right triangle`, `square`, `star`, `wave`

### Animals
`bat`, `bird`, `cat`, `cow`, `dog`, `duck`, `elephant`, `fish`, `frog`, `horse`, `monkey`, `penguin`, `rabbit`, `scorpion`

### Moods
`alien`, `angry`, `blushing`, `bored`, `cool`, `confused`, `crying`, `laughing`, `love`, `mad`, `nerd`, `robot`, `sad`, `shocked`, `sleepy`, `smiley`, `surprised`, `surly`, `thinking`, `wink`

## Extending Patterns

Patterns live under `src/any*.ts`. Each export is a simple object literal:

```ts
// src/anyShape.ts
export const shapePatterns = {
  rocket: [
    '   ^   ',
    '  / \\  ',
    '  | |  ',
    ' /___\\ ',
    '  | |  ',
    '  | |  ',
    '  | |  ',
    '  ***  '
  ],
  // ...
} as const;
```

Add your pattern, rebuild, and it becomes instantly available in both the API and CLI (`any-pattern shape rocket`).

## Development

```bash
git clone https://github.com/diyonfinesco/any-pattern.git
cd any-pattern
npm install

npm run build      # compile TypeScript and CLI to dist/
npm test           # run Vitest suite

# try the local build
node dist/cli.js log "Dev Mode" --color cyanBright
```

To try the package in another project without publishing:

```bash
npm run build
cd examples/local-test
npm install ../..     # installs from the local folder
npm run demo
```

## Contributing

Issues, ideas, and PRs are always welcome. If you are adding a new pattern, please include a short description, update the corresponding type union in `src/index.ts`, and add tests or examples when possible.

## License

MIT © [Diyon Finesco](https://github.com/diyonfinesco)

[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/diyonfinesco/any-pattern/pulls)
[![Issues](https://img.shields.io/github/issues/diyonfinesco/any-pattern?style=flat-square)](https://github.com/diyonfinesco/any-pattern/issues)
[![Last Commit](https://img.shields.io/github/last-commit/diyonfinesco/any-pattern?style=flat-square)](https://github.com/diyonfinesco/any-pattern/commits/main)
