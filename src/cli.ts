import {
    anyLog,
    anyShape,
    anyAnimal,
    anyMood,
    shapes,
    animals,
    moods,
    type ColorOption,
    type Shape,
    type Animal,
    type Mood,
} from './index';
import { COLORS, isColorOption } from './colors';

type Command = 'log' | 'shape' | 'animal' | 'mood' | 'list';

interface FlagResult {
    found: boolean;
    value?: string;
}

function main(): void {
    const args = process.argv.slice(2);

    if (hasFlag(args, '--version', '-v')) {
        console.log(getVersion());
        return;
    }

    if (args.length === 0 || hasFlag(args, '--help', '-h')) {
        printHelp();
        process.exit(args.length === 0 ? 1 : 0);
    }

    const listFlag = extractListFlag(args);
    if (listFlag.found) {
        handleList(listFlag.value);
        return;
    }

    const command = (args.shift() ?? '').toLowerCase() as Command;

    switch (command) {
        case 'log':
            handleLog(args);
            break;
        case 'shape':
            handleShape(args);
            break;
        case 'animal':
            handleAnimal(args);
            break;
        case 'mood':
            handleMood(args);
            break;
        case 'list':
            handleList(args[0]);
            break;
        default:
            console.error(`Unknown command "${command}".`);
            printHelp();
            process.exit(1);
    }
}

function handleLog(args: string[]): void {
    const color = extractColor(args);
    const char = extractOption(args, '--char');
    const spacing = parseIntegerOption(args, '--spacing');
    const scale = parseIntegerOption(args, '--scale');
    const text = args.join(' ');

    if (!text) {
        console.error('Please provide text to render.');
        process.exit(1);
    }

    anyLog(text, color, {
        ...(char ? { char } : {}),
        ...(spacing !== undefined ? { spacing } : {}),
        ...(scale !== undefined ? { scale } : {}),
    });
}

function handleShape(args: string[]): void {
    const color = extractColor(args);
    const name = resolveName(args.shift(), shapes, 'shape', 'shapes');
    anyShape(name as Shape, color);
}

function handleAnimal(args: string[]): void {
    const color = extractColor(args);
    const name = resolveName(args.shift(), animals, 'animal', 'animals');
    anyAnimal(name as Animal, color);
}

function handleMood(args: string[]): void {
    const color = extractColor(args);
    const name = resolveName(args.shift(), moods, 'mood', 'moods');
    anyMood(name as Mood, color);
}

/**
 * Validates a positional name. Supports the literal `random`, which picks an
 * entry from the catalogue. Exits with a helpful message when missing.
 */
function resolveName(
    raw: string | undefined,
    catalogue: string[],
    kind: string,
    listKey: string
): string {
    if (!raw) {
        console.error(`Please provide a ${kind} name (try "any-pattern list ${listKey}").`);
        process.exit(1);
    }

    if (raw.toLowerCase() === 'random') {
        return catalogue[Math.floor(Math.random() * catalogue.length)];
    }

    return raw;
}

function handleList(target?: string): void {
    const normalized = (target ?? '').toLowerCase();

    switch (normalized) {
        case 'shapes':
            listItems('Shapes', shapes);
            break;
        case 'animals':
            listItems('Animals', animals);
            break;
        case 'moods':
            listItems('Moods', moods);
            break;
        case 'colors':
            listItems('Colors', [...COLORS, 'rainbow']);
            break;
        default:
            console.error('Please specify what to list: shapes, animals, moods, or colors.');
            process.exit(1);
    }
}

function listItems(label: string, items: string[]): void {
    console.log(`${label}:`);
    console.log([...items].sort((a, b) => a.localeCompare(b)).join(', '));
}

function extractColor(args: string[]): ColorOption {
    if (extractBooleanFlag(args, '--rainbow')) {
        return 'rainbow';
    }

    const raw = extractOption(args, '--color', '-c');
    if (!raw) {
        return 'white';
    }

    if (!isColorOption(raw)) {
        console.error(`Color "${raw}" is not supported. Try "any-pattern list colors".`);
        process.exit(1);
    }

    return raw;
}

function extractOption(args: string[], ...flags: string[]): string | undefined {
    for (const flag of flags) {
        const index = args.indexOf(flag);
        if (index !== -1) {
            const value = args[index + 1];
            if (!value || value.startsWith('-')) {
                console.error(`Flag "${flag}" requires a value.`);
                process.exit(1);
            }
            args.splice(index, 2);
            return value;
        }
    }
    return undefined;
}

function extractBooleanFlag(args: string[], flag: string): boolean {
    const index = args.indexOf(flag);
    if (index === -1) {
        return false;
    }
    args.splice(index, 1);
    return true;
}

function parseIntegerOption(args: string[], flag: string): number | undefined {
    const value = extractOption(args, flag);
    if (value === undefined) {
        return undefined;
    }

    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
        console.error(`Flag "${flag}" expects a positive integer value.`);
        process.exit(1);
    }

    return parsed;
}

function hasFlag(args: string[], ...flags: string[]): boolean {
    return flags.some((flag) => args.includes(flag));
}

function extractListFlag(args: string[]): FlagResult {
    const index = args.findIndex((arg) => arg === '--list' || arg === '-l');
    if (index === -1) {
        return { found: false };
    }

    const next = args[index + 1];
    const hasValue = typeof next === 'string' && !next.startsWith('-');
    const value = hasValue ? next : undefined;

    args.splice(index, hasValue ? 2 : 1);

    return { found: true, value };
}

function getVersion(): string {
    try {
        // package.json lives one level above the bundled dist/cli.js.
        const path = require('path') as typeof import('path');
        const pkg = require(path.join(__dirname, '..', 'package.json'));
        return pkg.version ?? 'unknown';
    } catch {
        return 'unknown';
    }
}

function printHelp(): void {
    console.log(`any-pattern <command> [options]

Commands:
  log <text>            Render ASCII letters using anyLog.
  shape <name|random>   Render a shape pattern.
  animal <name|random>  Render an animal pattern.
  mood <name|random>    Render a mood pattern.
  list <type>           List available shapes, animals, moods, or colors.

Options:
  --color, -c <color>   Set output color (default: white).
  --rainbow             Render with a rainbow gradient (overrides --color).
  --char <char>         (log) Override the character used in the banner font.
  --spacing <n>         (log) Adjust spacing between letters (default: 2).
  --scale <n>           (log) Scale banner font (default: 1).
  --list, -l <type>     List shapes, animals, moods, or colors from anywhere.
  --version, -v         Print the installed version.
  --help, -h            Show this message.

Examples:
  any-pattern log "Hello World" --color cyan
  any-pattern log "v2.0!" --rainbow --scale 2
  any-pattern shape heart --color redBright
  any-pattern animal random
  any-pattern mood cool --rainbow
  any-pattern list shapes`);
}

main();
