const calculator = document.querySelector('.calculator');
const exit = document.querySelector('.exit');
const switchSignButton = document.querySelector('.switchSignButton');
const eraseButton = document.querySelector('.eraseButton');
const messageBox = document.querySelector('.messageBox');
const getNumbers = document.querySelectorAll('.numberButton');
const getOperation = document.querySelectorAll('.operationButton');
const equalButton = document.querySelector('.equalButton');
const percentageButton = document.querySelector('.percentageButton');
const commaButton = document.querySelector('.commaButton');
const firstNumber = document.querySelector('.firstNumber');
const secondNumber = document.querySelector('.secondNumber');
const operator = document.querySelector('.operator')

exit.addEventListener('click', () => {
    calculator.style.display = "none";
});

eraseButton.addEventListener('click', () => {
    firstNumber.innerText = "";
    secondNumber.innerText = "";
    operator.innerText = "";
});

getNumbers.forEach(button => {
    button.addEventListener('click', event => {
        if (firstNumber.innerText.length + secondNumber.innerText.length === 10) return;
        if (operator.innerText === "") {
            const clickedButton = event.target.textContent;
            firstNumber.innerText += clickedButton;
        } else {
            const clickedButton = event.target.textContent;
            secondNumber.innerText += clickedButton;
        }
    })
});

getOperation.forEach(button => {
    button.addEventListener('click', event => {
        const clickedButton = event.target.textContent;
        if (firstNumber.innerText === ("")) {
            return;
        }
        if (secondNumber.innerText > 0) {
            calculateResult()
            operator.innerText = clickedButton;
            return;
        }
        operator.innerText = clickedButton;
    });
});


equalButton.addEventListener('click', () => {
    calculateResult()
    operator.innerText = "";
});

const calculateResult = () => {
    let firstNumberToOperate = firstNumber.innerText;
    let secondNumberToOperate = secondNumber.innerText;
    let operatorToOperate = operator.innerText;
    let result;

    if (firstNumber.innerText.endsWith(".") || secondNumber.innerText.endsWith(".")) return;
    if (firstNumber.innerText === ("")) return;
    if (firstNumber.innerText.length > 0 && secondNumber.innerText === ("")) return;

    if (operatorToOperate === "+") {
        result = parseFloat(firstNumberToOperate) + parseFloat(secondNumberToOperate);
    } else if (operatorToOperate === "-") {
        result = parseFloat(firstNumberToOperate) - parseFloat(secondNumberToOperate);
    } else if (operatorToOperate === "*") {
        result = parseFloat(firstNumberToOperate) * parseFloat(secondNumberToOperate);
    } else if (operatorToOperate === "/") {
        result = parseFloat(firstNumberToOperate) / parseFloat(secondNumberToOperate);
        if (!isFinite(result)) {
            showMessage();
            return;
        }
    }

    result = result.toFixed(2);

    if (result.endsWith(".00")) {
        result = result.toString().replace(/\.00$/, "")
    }
    
    firstNumber.innerText = parseFloat(result);
    secondNumber.innerText = "";
}

percentageButton.addEventListener('click', event => {
    if (operator.innerText === "") {
        firstNumber.innerText = parseFloat(firstNumber.innerText / 100);
    } else {
        secondNumber.innerText = parseFloat(secondNumber.innerText / 100);

    }
})

switchSignButton.addEventListener('click', () => {
    if (operator.innerText === "") {
        number = firstNumber.innerText
        if (number.charAt(0) === "-") {
            number = number.slice(1);
            firstNumber.innerText = number;
            return;
        } else {
            number = firstNumber.innerText
            number = "-" + number;
            firstNumber.innerText = number;
            return;
        }
    } else {
        number = secondNumber.innerText
        if (number.charAt(0) === "-") {
            number = number.slice(1);
            secondNumber.innerText = number;
            return;
        } else {
            number = secondNumber.innerText
            number = "-" + number;
            secondNumber.innerText = number;
            return;
        }
    }
});

commaButton.addEventListener('click', () => {
    if (operator.innerText === "") {
        let number = firstNumber.innerText;
        let comma = number.includes(".")
        if (comma) {
            return;
        } else {
            number = number + ".";
            firstNumber.innerText = number;
        }
    }
    if (operator.innerText !== "") {
        let number = secondNumber.innerText;
        let comma = number.includes(".")
        if (comma) {
            return;
        } else {
            number = number + ".";
            secondNumber.innerText = number;
        }
    }
});

const showMessage = () => {
    messageBox.style.visibility = 'visible';
    messageBox.style.padding = '20px';
    messageBox.style.opacity = '1';
    messageBox.textContent = "ⓧ No se puede dividir por 0";
    calculator.style.backgroundColor = '#ae6e6e';
    setTimeout(() => {
        messageBox.style.visibility = 'hidden';
        messageBox.style.padding = '2px';
        messageBox.style.opacity = '0';
        calculator.style = backgroundColor = '#7e808b'
    }, 3000);
    return;
};