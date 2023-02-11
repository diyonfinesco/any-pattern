import chalk from "chalk";

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

class AnyPattern {
    // properties
    private _color: Color = "white"
    private _text: string = ""
    private _printMethods: { [key: string]: () => void } = {
        a: this.printA,
        b: this.printB,
        c: this.printC,
        d: this.printD,
        e: this.printE,
        f: this.printF,
        g: this.printG,
        h: this.printH,
        i: this.printI,
        j: this.printJ,
        k: this.printK,
        l: this.printL,
        m: this.printM,
        n: this.printN,
        o: this.printO,
        p: this.printP,
        q: this.printQ,
        r: this.printR,
        s: this.printS,
        t: this.printT,
        u: this.printU,
        v: this.printV,
        w: this.printW,
        x: this.printX,
        y: this.printY,
        z: this.printZ
    };

    private _shapeMethods: { [key in Shape]: () => void } = {
        "square": this.printSquare,
        'hollow square': this.printHollowSquare,
        'right triangle': this.printRightTriangle,
        'left triangle': this.printLeftTriangle,
        'downward triangle': this.printDownwardTriangle,
        'hollow triangle': this.printHollowTriangle,
        'pyramid': this.printPyramid,
        'reversed pyramid': this.printReversedPyramid,
        'hollow pyramid': this.printHollowPyramid,
        'diamond': this.printDiamond,
        "hollow diamond": this.printHollowDiamond,
        'hourglass': this.printHourglass,
        'heart': this.printHeart
    }

    // constructor
    constructor() {
    }

    /**
     * print
     */
    public print(text: string, color: Color = "white") {
        this._text = text
        this._color = color

        for (const letter of this._text) {
            if (this._printMethods[letter]) {
                this._printMethods[letter].call(this);
            }
        }
    }

    /**
     * shape
     */
    public shape(shape: Shape, color: Color = "white") {
        this._color = color

        this._shapeMethods[shape].call(this)
    }

    private printA() {
        let n = 5;
        let px = n;
        let py = n;
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j < 10; j++) {
                if (j == px || j == py || i == Math.floor(n / 2) + 1 && j == 5) {
                    line += "*"
                } else {
                    line += " "
                }
            }
            px++;
            py--;
            this.printLine(line)
        }
        console.log()
    }

    private printB() {
        for (let i = 1; i <= 7; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (j == 1 || ((i == 1 || i == 4 || i == 7) && (j < 5 && j > 1)) || (j == 5 && (i != 1 && i != 4 && i != 7))) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printC() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if ((i == 1 && (j > 1) || i == 5 && (j > 1)) || (j == 1 && (i != 1 && i != 5))) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printD() {
        for (let i = 1; i <= 5; i++) {
            let line = ""

            for (let j = 1; j <= 5; j++) {
                if ((i == 1 && j < 5) || (i == 5 && j < 5) || (j == 5 && i > 1 && i < 5) || j == 2) {
                    line += "*";
                }
                else {
                    line += " ";
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printE() {
        let n = 5;
        for (let i = 1; i <= n; i++) {
            let line = ""
            for (let j = 1; j <= n; j++) {
                if (i == 1 || i == 5 || i == Math.floor(n / 2) + 1 || j == 1) {
                    line += "" + "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printF() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 || i == 3 || j == 1) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printG() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if ((i == 1 && (j > 1) || i == 5 && (j > 1)) || (j == 1 && (i != 1 && i != 5)) || (j == 5 && i > 2) || (i == 3 && j > 2)) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printH() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (j == 1 || i == 3 || j == 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printI() {
        for (let i = 1; i <= 7; i++) {
            let line = ""
            for (let j = 1; j <= 7; j++) {
                if (i == 1 || i == 7 || j == 4) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printJ() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 || j == 5 || i == 5 && j >= 2 || i == 4 && j == 1) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printK() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (j == 1 || i == j && i >= 3 || i == 1 && j == 5 || i == 2 && j == 4) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printL() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 5 || j == 1) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printM() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 7; j++) {
                if (j == 1 || j == 7 || i == j && i <= 4 || i == 2 && j == 6 || i == 3 && j == 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printN() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == j || j == 1 || j == 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }
    private printO() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if ((i == 1 && j > 1 && j < 5) || i == 5 && j > 1 && j < 5 || j == 1 && i > 1 && i < 5 || j == 5 && i > 1 && i < 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printP() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 && j < 5 || j == 1 || i == 3 && j < 5 || i == 2 && j == 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printQ() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if ((i == 1 && j > 1 && j < 4) || i == 4 && j > 1 && j < 5 || j == 1 && i > 1 && i < 4 || j == 4 && i > 1 && i < 5 || i == 5 && j == 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printR() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 && j < 5 || j == 1 || i == 3 && j < 5 || i == 2 && j == 5 || i == j && i > 3) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }


    private printS() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 && j > 1 || i == 5 && j < 5 || i == 3 || i == 2 && j == 1 || i == 4 && j == 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printT() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 || j == 3) {

                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printU() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 5 && j > 1 && j < 5 || j == 1 && i < 5 || j == 5 && i < 5) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printV() {
        let n = 5
        let px = 1
        let py = n * 2 - 1;
        for (let i = 1; i <= n; i++) {
            let line = ""
            for (let j = 1; j < n * 2; j++) {
                if (j == px || j == py) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            px++;
            py--;
            this.printLine(line)
        }
        console.log()
    }


    private printW() {
        for (let i = 1; i <= 7; i++) {
            let line = ""
            for (let j = 1; j <= 7; j++) {
                if (j == 1 || j == 7 || i == j && i >= 4 || i == 6 && j == 2 || i == 5 && j == 3) {
                    line += "* "
                }
                else {
                    line += "  "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printX() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == j || i == 1 && j == 5 || i == 2 && j == 4 || i == 4 && j == 2 || i == 5 && j == 1) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)

        }
        console.log()
    }

    private printY() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 && j == 5 || i == 2 && j == 4 || j == i && i <= 3 || j == 3 && i > 3) {
                    line += "*"
                }
                else {
                    line += " "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printZ() {
        for (let i = 1; i <= 5; i++) {
            let line = ""
            for (let j = 1; j <= 5; j++) {
                if (i == 1 || i == 5 || i == 2 && j == 4 || i == 4 && j == 2 || i == 3 && j == 3) {
                    line += "* "
                }
                else {
                    line += "  "
                }
            }
            this.printLine(line)
        }
        console.log()
    }

    private printSquare() {
        let n = 5;
        let string = "";

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printHollowSquare() {
        let n = 5;
        let string = "";

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === 0 || i === n - 1) {
                    string += "*";
                }
                else {
                    if (j === 0 || j === n - 1) {
                        string += "*";
                    }
                    else {
                        string += " ";
                    }
                }
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printRightTriangle() {
        let n = 5;
        let string = "";
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < n - i; j++) {
                string += " ";
            }
            for (let k = 0; k < i; k++) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printLeftTriangle() {
        let n = 5;
        let string = "";
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < i; j++) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printDownwardTriangle() {
        let n = 5;
        let string = "";
        for (let i = 0; i < n; i++) {
            for (let k = 0; k < n - i; k++) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printHollowTriangle() {
        let n = 6;
        let string = "";

        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < i; j++) {
                if (i === n) {
                    string += "*";
                }
                else {
                    if (j == 0 || j == i - 1) {
                        string += "*";
                    }
                    else {
                        string += " ";
                    }
                }
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printPyramid() {
        let n = 5;
        let string = "";
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n - i; j++) {
                string += " ";
            }
            for (let k = 0; k < 2 * i - 1; k++) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printReversedPyramid() {
        let n = 5;
        let string = "";
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                string += " ";
            }
            for (let k = 0; k < 2 * (n - i) - 1; k++) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printHollowPyramid() {
        let n = 5;
        let string = "";

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n - i; j++) {
                string += " ";
            }
            for (let k = 0; k < 2 * i - 1; k++) {
                if (i === 1 || i === n) {
                    string += "*";
                }
                else {
                    if (k === 0 || k === 2 * i - 2) {
                        string += "*";
                    }
                    else {
                        string += " ";
                    }
                }
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printDiamond() {
        let n = 5;
        let string = "";

        for (let i = 1; i <= n; i++) {
            for (let j = n; j > i; j--) {
                string += " ";
            }
            for (let k = 0; k < i * 2 - 1; k++) {
                string += "*";
            }
            string += "\n";
        }
        for (let i = 1; i <= n - 1; i++) {
            for (let j = 0; j < i; j++) {
                string += " ";
            }
            for (let k = (n - i) * 2 - 1; k > 0; k--) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printHollowDiamond() {
        let n = 5;
        let string = "";

        for (let i = 1; i <= n; i++) {
            for (let j = n; j > i; j--) {
                string += " ";
            }
            for (let k = 0; k < i * 2 - 1; k++) {
                if (k === 0 || k === 2 * i - 2) {
                    string += "*";
                }
                else {
                    string += " ";
                }
            }
            string += "\n";
        }
        for (let i = 1; i <= n - 1; i++) {

            for (let j = 0; j < i; j++) {
                string += " ";
            }

            for (let k = (n - i) * 2 - 1; k >= 1; k--) {
                if (k === 1 || k === (n - i) * 2 - 1) {
                    string += "*";
                }
                else {
                    string += " ";
                }
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printHourglass() {
        let n = 5;
        let string = "";

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                string += " ";
            }
            for (let k = 0; k < (n - i) * 2 - 1; k++) {
                string += "*";
            }
            string += "\n";
        }
        for (let i = 2; i <= n; i++) {
            for (let j = n; j > i; j--) {
                string += " ";
            }
            for (let k = 0; k < i * 2 - 1; k++) {
                string += "*";
            }
            string += "\n";
        }
        this.printLine(string)
    }

    private printHeart() {
        var n = 6;
        var str = "";
        for (let i = n / 2; i < n; i += 2) {
            for (let j = 1; j < n - i; j += 2) {
                str += " ";
            }

            for (let j = 1; j < i + 1; j++) {
                str += "*";
            }
            for (let j = 1; j < n - i + 1; j++) {
                str += " ";
            }
            for (let j = 1; j < i + 1; j++) {
                str += "*";
            }
            str += "\n";
        }

        for (let i = n; i > 0; i--) {
            for (let j = 0; j < n - i; j++) {
                str += " ";
            }
            for (let j = 1; j < i * 2; j++) {
                str += "*";
            }
            str += "\n";
        }
        this.printLine(str)
    }

    // print Line function
    private printLine(line: string) {
        console.log(chalk[this._color].bold(line));
    }
}

const anyPattern = {
    print(text: string, color?: Color) {
        new AnyPattern().print(text, color)
    },
    shape(shape: Shape, color?: Color) {
        new AnyPattern().shape(shape, color)
    }
}

anyPattern.print("abcdefghijklmnopqrstuvwxyz")

export default anyPattern;