import { moodPatterns } from "./anyMood";
import { logPatterns } from "./anyLog";
import { shapePatterns } from "./anyShape";
import { animalPatterns } from "./anyAnimal";
import {
    Color,
    ColorOption,
    COLORS,
    DEFAULT_COLOR,
    styleLines,
} from "./colors";

/* ======================
 * Types
 * ====================== */

export type { Color, ColorOption };
export { COLORS };

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
    | "left triangle"
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

export interface LogOptions {
    /** Character used for filled pixels (default: `*`). */
    char?: string;
    /** Gap between glyphs (default: `2`). */
    spacing?: number;
    /** Uniformly scales glyph width/height (default: `1`). */
    scale?: number;
}

const DEFAULT_LOG_OPTIONS: Required<LogOptions> = {
    char: "*",
    spacing: 2,
    scale: 1,
};

function normalizeKey(input: string): string {
    return input.toLowerCase().trim();
}

function getPattern(map: PatternMap, key: string): string[] | undefined {
    return map[normalizeKey(key)];
}

function warn(kind: string, value: string): void {
    console.warn(`⚠️ ${kind} "${value}" not found.`);
}

/** Catalogue helpers — handy for building menus, docs, or random pickers. */
export const shapes = Object.keys(shapePatterns) as Shape[];
export const animals = Object.keys(animalPatterns) as Animal[];
export const moods = Object.keys(moodPatterns) as Mood[];

/* ======================
 * Render API (returns strings — capturable, no side effects)
 * ====================== */

/**
 * Build a banner string from `text` without printing it.
 * @param text The string to render.
 * @param options Rendering options (char, spacing, scale).
 * @param color Optional color/rainbow. Omit for plain, capturable output.
 */
export function renderLog(
    text: string,
    options: LogOptions = {},
    color?: ColorOption
): string {
    const cfg = { ...DEFAULT_LOG_OPTIONS, ...options };
    const raw = logPatterns(text.toLowerCase(), cfg) as string;
    return styleLines(raw.split("\n"), color, { bold: Boolean(color) }).join("\n");
}

/**
 * Build a shape string without printing it.
 * @throws If the shape name is unknown.
 */
export function renderShape(shape: Shape, color?: ColorOption): string {
    const pattern = getPattern(shapePatterns, shape);
    if (!pattern) {
        throw new Error(`Shape "${shape}" not found.`);
    }
    return styleLines(pattern, color, { bold: Boolean(color) }).join("\n");
}

/**
 * Build an animal string without printing it.
 * @throws If the animal name is unknown.
 */
export function renderAnimal(animal: Animal, color?: ColorOption): string {
    const pattern = getPattern(animalPatterns, animal);
    if (!pattern) {
        throw new Error(`Animal "${animal}" not found.`);
    }
    return styleLines(pattern, color, { bold: Boolean(color) }).join("\n");
}

/**
 * Build a mood string without printing it.
 * @throws If the mood name is unknown.
 */
export function renderMood(mood: Mood = "smiley", color?: ColorOption): string {
    const pattern = getPattern(moodPatterns, mood);
    if (!pattern) {
        throw new Error(`Mood "${mood}" not found.`);
    }
    return styleLines(pattern, color, { bold: false }).join("\n");
}

/* ======================
 * Print API (renders to the console)
 * ====================== */

/**
 * Prints text as a banner of character patterns.
 * @param text The string to print.
 * @param color The color to use (default: white). Pass `"rainbow"` for a gradient.
 * @param options Optional rendering options for the log pattern.
 */
export function anyLog(
    text: string,
    color: ColorOption = DEFAULT_COLOR,
    options: LogOptions = {}
): void {
    try {
        console.log(renderLog(text, options, color));
    } catch {
        console.warn(`Something went wrong rendering the text "${text}".`);
    }
}

/**
 * Renders a geometric shape pattern.
 */
export function anyShape(shape: Shape, color: ColorOption = DEFAULT_COLOR): void {
    try {
        console.log(renderShape(shape, color));
        console.log();
    } catch {
        warn("Shape", shape);
    }
}

/**
 * Renders an animal pattern.
 */
export function anyAnimal(animal: Animal, color: ColorOption = DEFAULT_COLOR): void {
    try {
        console.log(renderAnimal(animal, color));
        console.log();
    } catch {
        warn("Animal", animal);
    }
}

/**
 * Renders a mood (emoji-like) pattern.
 */
export function anyMood(mood: Mood = "smiley", color: ColorOption = DEFAULT_COLOR): void {
    try {
        console.log(renderMood(mood, color));
    } catch {
        warn("Mood", mood);
    }
}
