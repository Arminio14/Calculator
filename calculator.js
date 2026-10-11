const input = document.getElementById("calculatorInput");
const input2 = document.getElementById("ergebnisAnzeige");
const clear = document.getElementById("clearHistory")
const buttons = document.querySelectorAll("#Background button");
const backButton = document.getElementById("back");
const erease = document.getElementById("erease");
const equal = document.getElementById("equal");
const p = document.getElementById("ergebnisSammlung");
const history = document.getElementById("history");

buttons.forEach(button => {
    button.addEventListener("click", function() {
        if (button.id !== "equal") {
            input.value += button.innerText;
        }
    });
});

backButton.addEventListener("click", function() {
    input.value = input.value.slice(0, -2);
    input2.value = input.value.slice(0, input2);
});

erease.addEventListener("click", function(){
    input.value = input.value.slice(0, input);
    input2.value = input.value.slice(0, input2);
});

clear.addEventListener("click", function() {
    history.innerHTML = "";
})

const sinDeg = deg => Math.sin(deg * Math.PI / 180);
const cosDeg = deg => Math.cos(deg * Math.PI / 180);
const tanDeg = deg => Math.tan(deg * Math.PI / 180);

const asinDeg = val => Math.asin(val) * 180 / Math.PI;
const acosDeg = val => Math.acos(val) * 180 / Math.PI;
const atanDeg = val => Math.atan(val) * 180 / Math.PI;

const round2 = val => Number(Math.round(val + "e2") + "e-2");

btnRound2.addEventListener("click", function() {
    let val = parseFloat(input.value);
    if (!isNaN(val)) {
        input.value = round2(val);
    }
});

btnRound.addEventListener("click", function() {
    let val = parseFloat(input.value);
    if (!isNaN(val)) {
        input.value = Math.round(val);
    }
});

function calculate() {
    let originalExpress = input.value;
    let express = input.value;

    express = express.replace(/π/g, "Math.PI");
    express = express.replace(/√\(/g, "Math.sqrt(");
    express = express.replace(/√([0-9.]+)/g, "Math.sqrt($1)");
    express = express.replace(/\bsin\b/g, "sinDeg");
    express = express.replace(/\bcos\b/g, "cosDeg");
    express = express.replace(/\btan\b/g, "tanDeg");
    express = express.replace(/\basin\b/g, "asinDeg");
    express = express.replace(/\bacos\b/g, "acosDeg");
    express = express.replace(/\batan\b/g, "atanDeg");
    express = express.replace(/\bround\b/g, "round2");
    express = express.replace(/\broundNormal\b/g, "Math.round");
    express = express.replace(/\^/g, "**");
    express = express.replace(/²/g, "**2");

    if (/\/0(?![0-9])/.test(express)) {
        input2.value = "DIVIDE BY 0 Error";
    } 
    else if (/^[0-9+*/.() ^²]|(Math\.PI)|(Math\.sqrt)|(sinDeg)|(cosDeg)|(tanDeg)|(asinDeg)|(acosDeg)|(atanDeg)|(round2)|(Math\.round)|\*\*+$/.test(express)) {
        let result = Function("sinDeg", "cosDeg", "tanDeg", "asinDeg", "acosDeg", "atanDeg", "round2", '"use strict";return (' + express + ')')(sinDeg, cosDeg, tanDeg, asinDeg, acosDeg, atanDeg, round2);
        let finalResult = Number(result.toFixed(10));
        input2.value = finalResult;

        let item = document.createElement("div");
        item.className = "history-item";
        item.textContent = originalExpress + " = " + finalResult;
        history.prepend(item);
    } 
    else {
        input2.value = "Fehler!!!";
    }
}

equal.addEventListener("click", calculate);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculate();
    }
});