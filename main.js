const display = document.querySelector('.display');
const switchSignButton = document.querySelector('.switchSignButton');
const eraseButton = document.querySelector('.eraseButton');
const commaButton = document.querySelector('.commaButton');
const getNumbers = document.querySelectorAll('.numberButton');
const getOperation = document.querySelectorAll('.operationButton');
const calculator = document.querySelector('.calculator');
const messageBox = document.querySelector('.messageBox');
const exit = document.querySelector('.exit');
let commaBlock = false;

exit.addEventListener('click', () => {
    calculator.style.display = "none";
});

eraseButton.addEventListener('click', () => {
    display.innerText = display.innerText.slice(0, -1);
});

switchSignButton.addEventListener('click', () => {
    let number = display.innerText;
    if (display.innerText === "") {
        return;
    }
    if (number.charAt(0) === "-") {
        number = number.slice(1);
        display.innerText = number;
        return;
    } else {
        number = "-" + number;
        display.innerText = number;
        return;
    }
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

const showMessage = () => {
    messageBox.style.visibility = 'visible';
    setTimeout(() => {
        messageBox.style.visibility = 'hidden';
    }, 4000);
    return;
};

commaButton.addEventListener('click', () => {
    if (display.innerText.length > 0 && commaBlock === false) {
        if (endsWithOperator(display.innerText)) {
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
    if (['+', '-', '*', '/', '.'].some(symbol => display.innerText.endsWith(symbol))) {
        messageBox.textContent = " ⓧ No puede acabar tu operación con un símbolo. Modifícalo y vuelve a intentarlo."
        showMessage();
        return;
    }
    if (display.innerText.length > 0) {
        let preCalculate = display.innerText
        removeZeros()
        let result = Function("return " + display.innerText)();
        display.innerText = result;

        if (!isFinite(result)) {
            messageBox.textContent = "ⓧ No se puede dividir por 0"
            showMessage();
            return display.innerText = preCalculate;
        } else {
            display.innerText = result;
            commaBlock = true;
        }
    }
}

const calculateWithPercentage = () => {
    let numbers = display.innerText;
    const regex = /\d+(?:\.\d+)?%/;
    if (regex.test(numbers)) {
        let numberWithoutPercentage = parseFloat(numbers.substring(0, numbers.length - 1));
        numberWithoutPercentage = numberWithoutPercentage / 100;
        display.innerText = numberWithoutPercentage;
        return;
    } else {
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
}
