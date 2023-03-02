const display = document.querySelector('#display');
const zeroButton = document.querySelector('#zeroButton');
const oneButton = document.querySelector('#oneButton');
const twoButton = document.querySelector('#twoButton');
const threeButton = document.querySelector('#threeButton');
const fourButton = document.querySelector('#fourButton');
const fiveButton = document.querySelector('#fiveButton');
const sixButton = document.querySelector('#sixButton');
const sevenButton = document.querySelector('#sevenButton');
const eightButton = document.querySelector('#eightButton');
const nineButton = document.querySelector('#nineButton');
const acButton = document.querySelector('#acbutton');
const onOffButton = document.querySelector('#onOffButton');
const addButton = document.querySelector('#addButton');
const subButton = document.querySelector('#subButton');
const multiplyButton = document.querySelector('#multiplyButton');
const divisionButton = document.querySelector('#divisionButton');
const equalButton = document.querySelector('#equalButton');
const commaButton = document.querySelector('#commaButton');

let calculate = 0;
let commaBlock = false;

oneButton.addEventListener('click', () => {
    display.innerText += "1";
});

twoButton.addEventListener('click', () => {
    display.innerText += "2";
});

threeButton.addEventListener('click', () => {
    display.innerText += "3";
});

fourButton.addEventListener('click', () => {
    display.innerText += "4";
});

fiveButton.addEventListener('click', () => {
    display.innerText += "5";
});

sixButton.addEventListener('click', () => {
    display.innerText += "6";
});

sevenButton.addEventListener('click', () => {
    display.innerText += "7";
});

eightButton.addEventListener('click', () => {
    display.innerText += "8";
});

nineButton.addEventListener('click', () => {
    display.innerText += "9";
});

zeroButton.addEventListener('click', () => {
    display.innerText += "0";
});

acButton.addEventListener('click', () => {
    display.innerText = display.innerText.slice(0, -1);
});

onOffButton.addEventListener('click', () => {
    display.innerText = "";
});

addButton.addEventListener('click', () => {
    if (display.innerText.length > 0) {
        if (display.innerText.endsWith("+") || display.innerText.endsWith("-") || display.innerText.endsWith("/") || display.innerText.endsWith("*") || display.innerText.endsWith("%") || display.innerText.endsWith(".")) {
            } else {
                display.innerText += "+";
                commaBlock = false;
            }
        }
    }
);

subButton.addEventListener('click', () => {
    if (display.innerText.length > 0) {
        if (display.innerText.endsWith("+") || display.innerText.endsWith("-") || display.innerText.endsWith("/") || display.innerText.endsWith("*") || display.innerText.endsWith("%") || display.innerText.endsWith(".")) {
            } else {
                display.innerText += "-";
                commaBlock = false;
            }
        }
    }
);

multiplyButton.addEventListener('click', () => {
    if (display.innerText.length > 0) {
        if (display.innerText.endsWith("+") || display.innerText.endsWith("-") || display.innerText.endsWith("/") || display.innerText.endsWith("*") || display.innerText.endsWith("%") || display.innerText.endsWith(".")) {
            } else {
                display.innerText += "*";
                commaBlock = false;
            }
        }
    }
);

divisionButton.addEventListener('click', () => {
    if (display.innerText.length > 0) {
        if (display.innerText.endsWith("+") || display.innerText.endsWith("-") || display.innerText.endsWith("/") || display.innerText.endsWith("*") || display.innerText.endsWith("%") || display.innerText.endsWith(".")) {
            } else {
                display.innerText += "/";
                commaBlock = false;
            }
        }
    }
);

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

percentageButton.addEventListener('click', () => {
    if (display.innerText.length > 0) {
        if (display.innerText.endsWith("+") || display.innerText.endsWith("-") || display.innerText.endsWith("/") || display.innerText.endsWith("*") || display.innerText.endsWith("%") || display.innerText.endsWith(".")) {
            } else {
                display.innerText += "%";
                commaBlock = false;
            }
        }
    }
);

equalButton.addEventListener('click', () => {
    
    let removeUnnesesaryZeros = display.innerText.replace(/^0+/, "").replace(/\.?0+$/, "");
    display.innerText = removeUnnesesaryZeros;

    if ((display.innerText).includes("%")) {
        return calculateWithPercentage();
    }
    if (display.innerText.length > 0) {
        calculate = display.innerText;
        display.innerText = eval(calculate.replace("%", "/100"));
        commaBlock = true;
    }

});

const calculateWithPercentage = () => {
    let numeros = display.innerText;
    let porcentaje = numeros.match(/\d+%/)[0];
    let simbolo = numeros.match(/[-+*/]\d+%/)[0][0];
    let porcentajeSinSimbolo = (porcentaje.replace("%", "")) / 100;
    let porcentajeYsimbolo = simbolo + porcentaje;
    let numerosSinPorcentaje = numeros.replace(porcentajeYsimbolo, "");
    let calculo = eval(numerosSinPorcentaje);
    let calculoFinal = (eval(calculo + simbolo + (porcentajeSinSimbolo * calculo)));
    commaBlock = true;
    display.innerText = calculoFinal;
}