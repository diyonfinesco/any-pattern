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
import anyPattern from 'any-pattern';

anyPattern.anyLog("Gm", "yellowBright");
```
This will print the following output to the terminal:

<br>
<div align="center">
	<img src="https://github.com/diyonfinesco/any-pattern/blob/main/images/Gm.png" width="90%" />
</div>

### Ex: anyShape method
```js
import anyPattern from 'any-pattern';

anyPattern.anyShape("heart", "red");
```
This will print the following output to the terminal:

<br>

<div align="center">
	<img src="https://github.com/diyonfinesco/any-pattern/blob/main/images/heart.png" width="90%" />
</div>

### More examples
These are some examples for usage.

```js
import anyPattern from 'any-pattern';

// default color (white)
anyPattern.anyLog("Hi");

// red color 
anyPattern.anyLog("Good Morning", "red");

// magenta color 
anyPattern.anyLog("Bye", "magenta");

// hollow square shape with green color 
anyPattern.anyShape("hollow square", "green");

// diamond shape with yellow color 
anyPattern.anyShape("diamond", "yellow");
```

## Shapes
These are few shapes which you can print on your terminal.

- `square`
- `hollow square`
- `right triangle`
- `left triangle`
- `downward triangle`
- `hollow triangle`
- `pyramid`
- `hollow pyramid`
- `reversed pyramid`
- `diamond`
- `hollow diamond`
- `hourglass`
- `heart`
  
## Colors

There are several colors to choose from, including standard colors and bright versions of those colors. 🎨 🖌

- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `blackBright`
- `redBright`
- `greenBright`
- `yellowBright`
- `blueBright`
- `magentaBright`
- `cyanBright`
- `whiteBright`


## Contributing
If you would like to contribute to the development of this package, please create a pull request 👨‍💻

## License
This package is licensed under the MIT License.
