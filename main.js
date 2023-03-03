const display = document.querySelector('.display');
const backButton = document.querySelector('.backButton');
const eraseButton = document.querySelector('.eraseButton');
const commaButton = document.querySelector('.commaButton');
const getNumbers = document.querySelectorAll('.numberButton');
const getOperation = document.querySelectorAll('.operationButton');
const exit = document.querySelector('.exit')
const calculator = document.querySelector('.calculator')

exit.addEventListener('click', () => {
    calculator.style.display = "none";
});

backButton.addEventListener('click', () => {
    display.innerText = display.innerText.slice(0, -1);
});

eraseButton.addEventListener('click', () => {
    display.innerText = "";
    commaBlock = false;
});

getNumbers.forEach(button => {
    button.addEventListener('click', event => {
        if (display.innerText.endsWith("%")) {
        } else {
            const clickedButton = event.target.textContent;
            display.innerText += clickedButton;
        }
    });
});

getOperation.forEach(button => {
    button.addEventListener('click', event => {
        const clickedButton = event.target.textContent;
        if (clickedButton === "=") {
            return result();
        }
        if (display.innerText.length > 0 && !endsWithOperator(display.innerText)) {
            display.innerText += clickedButton;
            commaBlock = false;
        }
    });
});

const endsWithOperator = (str) => {
    return ["+", "-", "/", "*", "%", "."].some(op => str.endsWith(op));
}

let commaBlock = false;
commaButton.addEventListener('click', () => {
    if (display.innerText.length > 0 && commaBlock === false) {
        if (display.innerText.endsWith("+") || display.innerText.endsWith("-") || display.innerText.endsWith("/") || display.innerText.endsWith("*") || display.innerText.endsWith("%") || display.innerText.endsWith(".")) {
        } else {
            display.innerText += ".";
            commaBlock = true;
        }
    }
}
);

const removeZeros = () => {
    display.innerText = display.innerText.replace(/\d+(\.\d+)?/g, function (match) {
        return parseFloat(match).toFixed(3);
    });
}

const result = () => {
    if ((display.innerText).includes("%")) {
        return calculateWithPercentage();
    }
    if (display.innerText.length > 0) {
        let preCalculate = display.innerText
        removeZeros()
        let result = Function("return " + display.innerText)();
        display.innerText = result;

        if (result === Infinity) {
            alert("No se puede Dividir por 0")
            return display.innerText = preCalculate;
        } else {
            display.innerText = resultado;
            commaBlock = true;
        }
    }
}

const calculateWithPercentage = () => {
    let numbers = display.innerText;
    let percentage = numbers.match(/\d+%/)[0];
    let symbol = numbers.match(/[-+*/]\d+%/)[0][0];
    let percentageWithoutSymbol = (percentage.replace("%", "")) / 100;
    let percentageWithSymbol = symbol + percentage;
    let numberWithoutPercentage = numbers.replace(percentageWithSymbol, "");
    let result = Function("return " + numberWithoutPercentage)();
    let finalResult = Function("return " + (eval(result + symbol + (percentageWithoutSymbol * result))))();
    commaBlock = true;
    display.innerText = finalResult;
}