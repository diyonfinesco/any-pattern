import { anyLog, anyShape, anyAnimal, anyMood, type Color } from './index';
import { shapePatterns } from './anyShape';
import { animalPatterns } from './anyAnimal';
import { moodPatterns } from './anyMood';

type Command = 'log' | 'shape' | 'animal' | 'mood' | 'list';

const COLORS: Color[] = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'blackBright',
    'gray',
    'redBright',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
    'whiteBright'
];

interface FlagResult {
    found: boolean;
    value?: string;
}

function main(): void {
    const args = process.argv.slice(2);

    if (args.length === 0 || hasHelpFlag(args)) {
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
    if (args.length === 0) {
        console.error('Please provide text to render.');
        process.exit(1);
    }

    const color = extractColor(args);
    const char = extractOption(args, '--char');
    const spacing = parseIntegerOption(args, '--spacing');
    const scale = parseIntegerOption(args, '--scale');
    const text = args.join(' ');

    anyLog(text, color, {
        ...(char ? { char } : {}),
        ...(spacing !== undefined ? { spacing } : {}),
        ...(scale !== undefined ? { scale } : {})
    });
}

function handleShape(args: string[]): void {
    const color = extractColor(args);
    const name = args.shift();

    if (!name) {
        console.error('Please provide a shape name (try "any-pattern list shapes").');
        process.exit(1);
    }

    anyShape(name, color);
}

function handleAnimal(args: string[]): void {
    const color = extractColor(args);
    const name = args.shift();

    if (!name) {
        console.error('Please provide an animal name (try "any-pattern list animals").');
        process.exit(1);
    }

    anyAnimal(name, color);
}

function handleMood(args: string[]): void {
    const color = extractColor(args);
    const name = args.shift();

    if (!name) {
        console.error('Please provide a mood name (try "any-pattern list moods").');
        process.exit(1);
    }

    anyMood(name, color);
}

function handleList(target?: string): void {
    const normalized = (target ?? '').toLowerCase();

    switch (normalized) {
        case 'shapes':
            listItems('Shapes', Object.keys(shapePatterns));
            break;
        case 'animals':
            listItems('Animals', Object.keys(animalPatterns));
            break;
        case 'moods':
            listItems('Moods', Object.keys(moodPatterns));
            break;
        case 'colors':
            listItems('Colors', COLORS);
            break;
        default:
            console.error('Please specify what to list: shapes, animals, moods, or colors.');
            process.exit(1);
    }
}

function listItems(label: string, items: string[]): void {
    console.log(`${label}:`);
    console.log(items.sort((a, b) => a.localeCompare(b)).join(', '));
}

function extractColor(args: string[]): Color {
    const raw = extractOption(args, '--color', '-c');
    if (!raw) {
        return 'white';
    }

    if (!isColor(raw)) {
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

function hasHelpFlag(args: string[]): boolean {
    return args.includes('--help') || args.includes('-h');
}

function extractListFlag(args: string[]): FlagResult {
    const index = args.findIndex(arg => arg === '--list' || arg === '-l');
    if (index === -1) {
        return { found: false };
    }

    const next = args[index + 1];
    const hasValue = typeof next === 'string' && !next.startsWith('-');
    const value = hasValue ? next : undefined;

    args.splice(index, hasValue ? 2 : 1);

    return {
        found: true,
        value
    };
}

function isColor(value: string): value is Color {
    return (COLORS as readonly string[]).includes(value);
}

function printHelp(): void {
    console.log(`any-pattern <command> [options]

Commands:
  log <text>            Render ASCII letters using anyLog.
  shape <name>          Render a shape pattern.
  animal <name>         Render an animal pattern.
  mood <name>           Render a mood pattern.
  list <type>           List available shapes, animals, moods, or colors.

Options:
  --color, -c <color>   Set output color (default: white).
  --char <char>         (log) Override the character used in the banner font.
  --spacing <n>         (log) Adjust spacing between letters (default: 2).
  --scale <n>           (log) Scale banner font (default: 1).
  --list, -l <type>     List shapes, animals, moods, or colors from anywhere.
  --help, -h            Show this message.

Examples:
  any-pattern log "Hello World" --color cyan
  any-pattern shape heart --color redBright
  any-pattern animal cat
  any-pattern --list shapes
  any-pattern list shapes`);
}

main();
