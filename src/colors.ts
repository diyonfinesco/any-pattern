import chalk from "chalk";

/* ======================
 * Color types
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

/**
 * Any concrete chalk color, or the special `"rainbow"` value which cycles a
 * vibrant palette line-by-line.
 */
export type ColorOption = Color | "rainbow";

/** All concrete colors, in a stable order (used by the CLI `list colors`). */
export const COLORS: Color[] = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "blackBright",
    "gray",
    "redBright",
    "greenBright",
    "yellowBright",
    "blueBright",
    "magentaBright",
    "cyanBright",
    "whiteBright",
];

export const DEFAULT_COLOR: Color = "white";

/** Palette cycled through when `"rainbow"` is requested. */
const RAINBOW_PALETTE: Color[] = [
    "redBright",
    "yellowBright",
    "greenBright",
    "cyanBright",
    "blueBright",
    "magentaBright",
];

type ChalkFn = (str: string) => string;

export function isColor(value: string): value is Color {
    return (COLORS as readonly string[]).includes(value);
}

export function isColorOption(value: string): value is ColorOption {
    return value === "rainbow" || isColor(value);
}

function resolveColorFn(color: Color): ChalkFn {
    const fn = (chalk as any)[color];
    return typeof fn === "function" ? (fn as ChalkFn) : chalk.white;
}

interface StyleOptions {
    /** Wrap each line in `chalk.bold`. Defaults to `false`. */
    bold?: boolean;
}

/**
 * Apply a color (or rainbow gradient) and optional bold styling to a block of
 * lines. When `color` is omitted the lines are returned untouched, which makes
 * the output safe to capture, diff, or write to a non-TTY stream.
 */
export function styleLines(
    lines: string[],
    color?: ColorOption,
    { bold = false }: StyleOptions = {}
): string[] {
    if (!color) {
        return [...lines];
    }

    const wrap = (line: string, fn: ChalkFn): string =>
        bold ? fn(chalk.bold(line)) : fn(line);

    if (color === "rainbow") {
        return lines.map((line, i) =>
            wrap(line, resolveColorFn(RAINBOW_PALETTE[i % RAINBOW_PALETTE.length]))
        );
    }

    const fn = resolveColorFn(color);
    return lines.map((line) => wrap(line, fn));
}
