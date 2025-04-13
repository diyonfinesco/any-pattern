import chalk from "chalk";
import { letterPatterns, characterPatterns, shapePatterns, animalPatterns } from './patterns'; // Import pattern data

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
// Infer Animal type from the keys of animalPatterns
type Animal = keyof typeof animalPatterns;

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
export function anyLog(text: string, color: string = 'white'): void {
    const lowerText = text.toLowerCase();
    for (const char of lowerText) {
        const pattern = letterPatterns[char];
        if (!pattern) {
            console.log(chalk.red(`Letter "${char}" not found!`));
            continue;
        }

        const colorFn = (chalk as any)[color];
        if (!colorFn || typeof colorFn !== 'function') {
            console.log(chalk.red(`Color "${color}" not found!`));
            return;
        }

        pattern.forEach(line => {
            console.log(colorFn(line));
        });
        console.log(); // Add a blank line between letters
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

/**
 * Prints a predefined animal pattern.
 * @param animal The name of the animal to print.
 * @param color The color to use (default: white).
 */
export function anyAnimal(animal: Animal, color: Color = 'white') {
    const pattern = animalPatterns[animal];
    if (pattern) {
        printPattern(pattern, color);
        console.log(); // Add a blank line after the animal 
    } else {
        console.warn(`Animal "${animal}" not found.`);
    }
}

export function anyCharacter(character: string, color: string = 'white'): void {
    const pattern = characterPatterns[character.toLowerCase()];
    if (!pattern) {
        console.log(chalk.red(`Character "${character}" not found!`));
        return;
    }

    const colorFn = (chalk as any)[color];
    if (!colorFn || typeof colorFn !== 'function') {
        console.log(chalk.red(`Color "${color}" not found!`));
        return;
    }

    pattern.forEach(line => {
        console.log(colorFn(line));
    });
}

