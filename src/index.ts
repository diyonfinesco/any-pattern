import chalk from "chalk";
import { characterPatterns, shapePatterns } from './patterns'; // Import pattern data

type Color =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'blackBright'
    | 'gray' // Note: chalk.gray is an alias for blackBright
    | 'redBright'
    | 'greenBright'
    | 'yellowBright'
    | 'blueBright'
    | 'magentaBright'
    | 'cyanBright'
    | 'whiteBright';

// Infer Shape type from the keys of shapePatterns for better maintainability
type Shape = keyof typeof shapePatterns;

// Helper function to print a pattern line by line with color
function printPattern(pattern: string[], color: Color = 'white') {
    const chalkColor = chalk[color] || chalk.white; // Fallback to white if color is invalid
    pattern.forEach(line => {
        console.log(chalkColor.bold(line));
    });
}

/**
 * Prints text as a sequence of character patterns.
 * @param text The string to print.
 * @param color The color to use (default: white).
 */
export function anyLog(text: string, color: Color = 'white') {
    const lowerCaseText = text.toLowerCase();

    for (const char of lowerCaseText) {
        const pattern = characterPatterns[char];
        if (pattern) {
            printPattern(pattern, color);
            console.log(); // Add a blank line between characters like the original
        } else {
            // Handle characters without defined patterns (e.g., spaces, symbols)
            // Original code skipped them, so we do the same.
            console.log(); // Maintain spacing even for unknown chars
        }
    }
}

/**
 * Prints a predefined shape pattern.
 * @param shape The name of the shape to print.
 * @param color The color to use (default: white).
 */
export function anyShape(shape: Shape, color: Color = 'white') {
    const pattern = shapePatterns[shape];
    if (pattern) {
        printPattern(pattern, color);
        console.log(); // Add a blank line after the shape like the original
    } else {
        console.warn(`Shape "${shape}" not found.`);
    }
}

