<div align="center">
	<br>
	<img src="https://github.com/diyonfinesco/any-pattern/blob/main/images/logo.png" width="90%" />
	<br>
	<br>
</div>

> Print anything on terminal with beautiful patterns

<p>
The package allows users to print letters, shapes, animals, and Moods on the terminal with ASCII art patterns and in different colors. It can be installed via npm and can be used in JavaScript or TypeScript by importing the package and calling the appropriate functions with the desired color.
</p>

## Features
- Print letters with `anyLog`
- Print shapes with `anyShape`
- Print animals with `anyAnimal`
- Print moods with `anyMood`
- Support for 16 different colors
- TypeScript support with type definitions
- CommonJS and ES Module support

## Installation
To install the package, run the following command in your terminal:

```sh
npm i any-pattern
```

## Usage

### JavaScript
```js
const anyPattern = require("any-pattern");

anyPattern.anyLog("Hello", "red");
anyPattern.anyShape("heart", "blue");
anyPattern.anyAnimal("cat", "yellow");
anyPattern.anyMood("smiley", "green");
```

### TypeScript
```ts
import { anyLog, anyShape, anyAnimal, anyMood } from 'any-pattern';

anyLog("Hello", "red");
anyShape("heart", "blue");
anyAnimal("cat", "yellow");
anyMood("smiley", "green");
```

## Letters
Print text using ASCII art letters with the `anyLog` function.

```js
import { anyLog } from 'any-pattern';

// Print "Hello" in red
anyLog("Hello", "red");

// Print "World" in blue (default color is white)
anyLog("World");
```

### Supported Letters
All letters from A to Z (case-insensitive)

## Shapes
Print various shapes with the `anyShape` function.

```js
import { anyShape } from 'any-pattern';

// Print a heart in red
anyShape("heart", "red");

// Print a diamond in blue
anyShape("diamond", "blue");
```

### Available Shapes
- Square
- Hollow Square
- Diamond
- Heart
- Star
- Triangle
- Hollow Triangle
- Pyramid
- Hollow Pyramid
- Plus
- Cross
- Arrow
- Circle
- Hollow Circle

## Animals
Print cute ASCII art animals with the `anyAnimal` function.

```js
import { anyAnimal } from 'any-pattern';

// Print a cat in blue
anyAnimal("cat", "blue");

// Print a dog in yellow
anyAnimal("dog", "yellow");
```

### Available Animals
- Cat
- Dog
- Fish
- bat
- Rabbit
- Monkey
- Elephant
- scorpion

## Moods
Print expressive ASCII art Moods with the `anyMood` function.

```js
import { anyMood } from 'any-pattern';

// Print a smiley face in yellow
anyMood("smiley", "yellow");

// Print a sad face in blue
anyMood("sad", "blue");
```

### Available Moods
- Smiley
- Sad
- Angry
- Surprised
- Wink
- Cool
- Sleepy
- Nerd
- Robot
- Alien

## Colors
All functions support the following colors:

- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray
- redBright
- greenBright
- yellowBright
- blueBright
- magentaBright
- cyanBright
- whiteBright


### Creating a Scene
```js
import { anyLog, anyShape, anyAnimal, anyMood } from 'any-pattern';

// Print a message
anyLog("Welcome to the Zoo!", "green");

// Print some animals
anyAnimal("lion", "yellow");
anyAnimal("elephant", "gray");
anyAnimal("monkey", "brown");

// Add some Moods
anyMood("smiley", "yellow");
anyMood("cool", "blue");
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT © [Diyon Finesco](https://github.com/diyonfinesco)
