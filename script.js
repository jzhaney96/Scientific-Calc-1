function appendToDisplay(value) {
    const display = document.getElementById("display");
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById("display");
    display.value = "";
}

function backspace() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById("display");
    let expression = display.value.replace(/\^/g, "**");
    expression = expression.replace(/Math\./g, "Math.");

    try {
        const result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = "Error";
    }
}

function convertToFraction() {
    const display = document.getElementById("display");
    let result = parseFloat(display.value);
    
    if (isNaN(result)) {
        display.value = "Error";
        return;
    }
    
    // Convert decimal to fraction
    let tolerance = 1.0E-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = result;
    
    do {
        let a = Math.floor(b);
        let temp = h1; h1 = a * h1 + h2; h2 = temp;
        temp = k1; k1 = a * k1 + k2; k2 = temp;
        b = 1 / (b - a);
    } while (Math.abs(result - h1 / k1) > result * tolerance);
    
    display.value = h1 + "/" + k1;
}
