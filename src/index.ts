import chalk from "chalk";
import { moodPatterns } from "./anyMood";
import { logPatterns } from "./anyLog";
import { shapePatterns } from "./anyShape";
import { animalPatterns } from "./anyAnimal";

/* ======================
 * Types
 * ====================== */

export type Color =
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "blackBright"
    | "gray"
    | "redBright"
    | "greenBright"
    | "yellowBright"
    | "blueBright"
    | "magentaBright"
    | "cyanBright"
    | "whiteBright";

export type Shape =
    | "arrow"
    | "arrow down"
    | "arrow up"
    | "circle"
    | "cross"
    | "downward triangle"
    | "diamond"
    | "heart"
    | "hexagon"
    | "hollow circle"
    | "hollow diamond"
    | "hollow pyramid"
    | "hollow square"
    | "hollow triangle"
    | "hourglass"
    | "infinity"
    | "left arrow"
    | "octagon"
    | "oval"
    | "pentagon"
    | "plus"
    | "pyramid"
    | "reversed pyramid"
    | "right arrow"
    | "right triangle"
    | "square"
    | "star"
    | "wave";

export type Animal =
    | "bat"
    | "bird"
    | "cat"
    | "cow"
    | "dog"
    | "duck"
    | "elephant"
    | "fish"
    | "frog"
    | "horse"
    | "monkey"
    | "penguin"
    | "rabbit"
    | "scorpion";

export type Mood =
    | "alien"
    | "angry"
    | "blushing"
    | "bored"
    | "cool"
    | "confused"
    | "crying"
    | "laughing"
    | "love"
    | "mad"
    | "nerd"
    | "robot"
    | "sad"
    | "shocked"
    | "sleepy"
    | "smiley"
    | "surprised"
    | "surly"
    | "thinking"
    | "wink";

/* ======================
 * Internals
 * ====================== */

type PatternMap = Record<string, string[]>;
type ChalkFn = (str: string) => string;

const DEFAULT_COLOR: Color = "white";

const DEFAULT_LOG_OPTIONS = {
    char: "*",
    spacing: 2,
    scale: 1,
} as const;

export type LogOptions = Partial<typeof DEFAULT_LOG_OPTIONS>;

function normalizeKey(input: string): string {
    return input.toLowerCase().trim();
}

function resolveColorFn(color: Color = DEFAULT_COLOR): ChalkFn {
    const fn = (chalk as any)[color];
    return typeof fn === "function" ? (fn as ChalkFn) : chalk.white;
}

function printLines(
    content: string[] | string,
    color: Color = DEFAULT_COLOR,
    { bold = true }: { bold?: boolean } = {}
): void {
    const colorFn = resolveColorFn(color);
    const stylize = bold ? (s: string) => colorFn(chalk.bold(s)) : colorFn;

    if (Array.isArray(content)) {
        content.forEach((line) => console.log(stylize(line)));
    } else {
        console.log(stylize(content));
    }
}

function getPattern(
    map: PatternMap,
    key: string
): string[] | undefined {
    return map[normalizeKey(key)];
}

function warn(kind: string, value: string): void {
    console.warn(`⚠️ ${kind} "${value}" not found.`);
}

/* ======================
 * Public API
 * ====================== */

/**
 * Prints text as a sequence of character patterns.
 * @param text The string to print.
 * @param color The color to use (default: white).
 * @param options Optional rendering options for the log pattern.
 */
export function anyLog(
    text: string,
    color: Color = DEFAULT_COLOR,
    options: LogOptions = {}
): void {
    try {
        const cfg = { ...DEFAULT_LOG_OPTIONS, ...options };
        const output = logPatterns(text.toLowerCase(), cfg) as string | undefined;

        if (output) {
            printLines(output, color, { bold: true });
        } else {
            console.warn(`Something went wrong rendering the text "${text}".`);
        }
    } catch (err) {
        console.warn(`Something went wrong rendering the text "${text}".`);
    }
}

/**
 * Renders a geometric shape pattern.
 */
export function anyShape(shape: Shape, color: Color = DEFAULT_COLOR): void {
    const map = shapePatterns as unknown as PatternMap;
    const pattern = getPattern(map, shape);

    if (pattern) {
        printLines(pattern, color, { bold: true });
        console.log();
    } else {
        warn("Shape", shape);
    }
}

/**
 * Renders an animal pattern.
 */
export function anyAnimal(animal: Animal, color: Color = DEFAULT_COLOR): void {
    const map = animalPatterns as unknown as PatternMap;
    const pattern = getPattern(map, animal);

    if (pattern) {
        printLines(pattern, color, { bold: true });
        console.log();
    } else {
        warn("Animal", animal);
    }
}

/**
 * Renders a mood (emoji-like) pattern.
 */
export function anyMood(mood: Mood, color: Color = DEFAULT_COLOR): void {
    const map = moodPatterns as unknown as PatternMap;
    const pattern = getPattern(map, mood);

    if (!pattern) {
        warn("Mood", mood);
        return;
    }

    printLines(pattern, color, { bold: false });
}
