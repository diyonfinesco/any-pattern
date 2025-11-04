# any-pattern

[![npm version](https://img.shields.io/npm/v/any-pattern.svg?style=for-the-badge&color=blue)](https://www.npmjs.com/package/any-pattern)
[![npm downloads](https://img.shields.io/npm/dt/any-pattern.svg?style=for-the-badge&color=brightgreen)](https://www.npmjs.com/package/any-pattern)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)


Turn plain terminal output into colourful ASCII art. `any-pattern` ships with banners, shapes, animals, and moods that you can render from code **or** directly from the command line.

<p align="center">
  <img width="600" height="200" alt="logo" src="https://github.com/user-attachments/assets/87361a67-31db-47bb-9acc-2d9030427608" />
</p>

## Highlights
- ready-to-use functions: `anyLog`, `anyShape`, `anyAnimal`, `anyMood`
- interactive CLI (`npx any-pattern`) with `--list` exploration
- 16 chalk colours plus banner spacing/scale options
- works with CommonJS, ESM, and TypeScript projects
- tree of ASCII assets you can extend or customise

## After you installed

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

anyLog('Hello', 'cyanBright', { char: '#', spacing: 2 });
anyShape('heart', 'redBright');
anyAnimal('cat', 'yellow');
anyMood('cool', 'blue');
```

`Color` is a strict union, so you get autocomplete and type checking in TypeScript-aware editors.

## CLI Usage

```bash
npx any-pattern log "Hello World" --color magentaBright --spacing 1 --scale 2
npx any-pattern shape heart --color red
npx any-pattern animal penguin
npx any-pattern mood laughing --color yellowBright
npx any-pattern --list shapes      # works as global flag
npx any-pattern list animals       # traditional sub-command
```

### Supported commands
- `log <text>` – render banner text (options: `--color`, `--char`, `--spacing`, `--scale`)
- `shape <name>` – draw a geometric pattern
- `animal <name>` – print an ASCII critter
- `mood <name>` – show an emoji-style face
- `list <shapes|animals|moods|colors>` – inspect what is bundled (also available via `--list`/`-l`)

Run `any-pattern --help` to see all flags in context.

## API Reference

### `anyLog(text, color?, options?)`
Render banner text using the built-in 5×7 font.

- `text` (`string`): content to render (letters, numbers, and space are supported)
- `color` (`Color`, default `white`): chalk colour name
- `options`:
  - `char` (`string`, default `*`): character used for filled pixels
  - `spacing` (`number`, default `2`): gap between glyphs
  - `scale` (`number`, default `1`): scales glyph width/height uniformly

### `anyShape(shape, color?)`
Print a shape from the catalogue. Shape names are case-insensitive; see the list below.

### `anyAnimal(animal, color?)`
Render one of the bundled animals.

### `anyMood(mood, color?)`
Display an emoji-like face. Unlike the other functions the output is not bolded, so it resembles emoticons.

### Colours

`any-pattern` understands the Chalk v4 palette:

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `blackBright`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

## Pattern Catalogue

### Shapes
`arrow`, `arrow down`, `arrow up`, `circle`, `cross`, `diamond`, `downward triangle`, `heart`, `hexagon`, `hollow circle`, `hollow diamond`, `hollow pyramid`, `hollow square`, `hollow triangle`, `hourglass`, `infinity`, `left arrow`, `left triangle`, `octagon`, `oval`, `pentagon`, `plus`, `pyramid`, `reversed pyramid`, `right arrow`, `right triangle`, `square`, `star`, `wave`

### Animals
`bat`, `bird`, `cat`, `cow`, `dog`, `duck`, `elephant`, `fish`, `frog`, `horse`, `monkey`, `penguin`, `rabbit`, `scorpion`, `snake`

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
