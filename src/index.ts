import chalk from "chalk";
import { moodsPatterns } from "./moods";
import { letterPatterns } from "./letters";
import { shapePatterns } from "./shapes";
import { animalPatterns } from "./animals";

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
    | 'gray'
    | 'redBright'
    | 'greenBright'
    | 'yellowBright'
    | 'blueBright'
    | 'magentaBright'
    | 'cyanBright'
    | 'whiteBright';


type Shape =
    | 'square'
    | 'hollow square'
    | 'right triangle'
    | 'left triangle'
    | 'downward triangle'
    | 'hollow triangle'
    | 'pyramid'
    | 'hollow pyramid'
    | 'reversed pyramid'
    | 'diamond'
    | 'hollow diamond'
    | 'hourglass'
    | 'heart';

type Animal =
    | 'cat'
    | 'dog'
    | 'scorpion'
    | 'bat'
    | 'rabbit'
    | 'monkey'
    | 'elephant'
    | 'fish'


type Mood =
    | 'smiley'
    | 'sad'
    | 'angry'
    | 'surprised'
    | 'wink'
    | 'cool'
    | 'sleepy'
    | 'nerd'
    | 'robot'
    | 'alien';


function printPattern(pattern: string[], color: Color = 'white') {
    const chalkColor = chalk[color] || chalk.white;
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
    const pattern = shapePatterns[shape.toLowerCase()];
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
    const pattern = animalPatterns[animal.toLowerCase()];
    if (pattern) {
        printPattern(pattern, color);
        console.log();

    } else {
        console.warn(`Animal "${animal}" not found.`);
    }
}

export function anyMood(mood: Mood, color: string = 'white'): void {
    const pattern = moodsPatterns[mood.toLowerCase()];
    if (!pattern) {
        console.log(chalk.red(`Mood "${mood}" not found!`));
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