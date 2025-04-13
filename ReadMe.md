<div align="center">
	<br>
	<img src="https://github.com/diyonfinesco/any-pattern/blob/main/images/logo.png" width="90%" />
	<br>
	<br>
</div>

> Print anything on terminal

<p>
The package allows users to print letters and shapes on the terminal with a star pattern and in different colors. It can be installed via npm and can be used in JavaScript or TypeScript by importing the package and calling the "print" and "shape" methods with the desired color.
</p>


<br>
<div align="center">
	<img src="https://github.com/diyonfinesco/any-pattern/blob/main/images/Hey.png" width="90%" />
</div>

<br>

## Installation
To install the package, run the following command in your terminal:

```sh
npm i any-pattern
```

## Usage

<br />

###  JavaScript
```js
const anyPattern = require("any-pattern");

anyPattern.anyLog("Hello", "red");
```
<br />

### TypeScript
```ts
import { anyLog } from 'any-pattern';

anyLog("Bye", "yellowBright");
```
<br />

### Ex: anyLog method
```js
import { anyLog } from 'any-pattern';

anyLog("Gm", "yellowBright");
```
This will print the following output to the terminal:

<br>
<div align="center">
	<img src="https://github.com/diyonfinesco/any-pattern/blob/main/images/Gm.png" width="90%" />
</div>

### Ex: anyShape method
```js
import { anyShape } from 'any-pattern';

anyShape("heart", "red");
```
This will print the following output to the terminal:

<br>

<div align="center">
	<img src="https://github.com/diyonfinesco/any-pattern/blob/main/images/heart.png" width="90%" />
</div>

### More examples
These are some examples for usage.

```js
import { anyLog, anyShape } from 'any-pattern';

// default color (white)
anyLog("Hi");

// red color 
anyLog("Good Morning", "red");

// magenta color 
anyLog("Bye", "magenta");

// hollow square shape with green color 
anyShape("hollow square", "green");

// diamond shape with yellow color 
anyShape("diamond", "yellow");
```

## Shapes
These are few shapes which you can print on your terminal.

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
You can now print various animal patterns on your terminal using the `anyAnimal` function.

```js
import { anyAnimal } from 'any-pattern';

// Print a cat in blue
anyAnimal('cat', 'blue');

// Print a dog in yellow
anyAnimal('dog', 'yellow');

// Print a bird in cyan
anyAnimal('bird', 'cyan');

// Print a fish in green
anyAnimal('fish', 'green');

// Print a pig in magenta
anyAnimal('pig', 'magenta');

// Print a mouse in gray
anyAnimal('mouse', 'gray');

// Print a cow in white
anyAnimal('cow', 'white');

// Print a snake in green
anyAnimal('snake', 'green');

// Print a rabbit in white
anyAnimal('rabbit', 'white');

// Print a duck in yellow
anyAnimal('duck', 'yellow');

// Print an owl in brown
anyAnimal('owl', 'brown');

// Print a monkey in brown
anyAnimal('monkey', 'brown');

// Print an elephant in gray
anyAnimal('elephant', 'gray');

// Print a bear in brown
anyAnimal('bear', 'brown');

// Print a lion in yellow
anyAnimal('lion', 'yellow');
```

### Available Animals
- Cat
- Dog
- Bird
- Fish
- Pig
- Mouse
- Cow
- Snake
- Rabbit
- Duck
- Owl
- Monkey
- Elephant
- Bear
- Lion

## Colors
You can use any of the following colors with both `anyLog`, `anyShape`, and `anyAnimal` functions:

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

## Characters
You can now print various character patterns on your terminal using the `anyCharacter` function.

```js
import { anyCharacter } from 'any-pattern';

// Print a smiley face in yellow
anyCharacter('smiley', 'yellow');

// Print a sad face in blue
anyCharacter('sad', 'blue');

// Print an angry face in red
anyCharacter('angry', 'red');

// Print a surprised face in cyan
anyCharacter('surprised', 'cyan');

// Print a winking face in magenta
anyCharacter('wink', 'magenta');

// Print a cool face in green
anyCharacter('cool', 'green');

// Print a sleepy face in gray
anyCharacter('sleepy', 'gray');

// Print a nerd face in white
anyCharacter('nerd', 'white');

// Print a robot face in blueBright
anyCharacter('robot', 'blueBright');

// Print an alien face in greenBright
anyCharacter('alien', 'greenBright');
```

### Available Characters
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

## Contributing
If you would like to contribute to the development of this package, please create a pull request 👨‍💻

## License
This package is licensed under the MIT License.
