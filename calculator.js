document.addEventListener('DOMContentLoaded', function () {
    let currentInput = "";
    let operation = null;
    let firstInput = "";

    const screen = document.querySelector('.screen');

    document.querySelector('.buttons').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const value = event.target.innerText;

            if (['+', '-', '×', '÷'].includes(value)) {
                if (firstInput !== "") {
                    firstInput = operate(firstInput, currentInput, operation);
                    screen.innerText = firstInput;
                    currentInput = "";
                } else {
                    firstInput = currentInput;
                    currentInput = "";
                }
                operation = value;
            } else if (value === '=') {
                if (firstInput) {
                    firstInput = operate(firstInput, currentInput, operation);
                    screen.innerText = firstInput;
                    currentInput = firstInput;
                    firstInput = "";
                }
            } else if (value === 'C') {
                firstInput = "";
                currentInput = "";
                operation = null;
                screen.innerText = "0";
            } else {
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                screen.innerText = currentInput;
            }
        }
    });

    function operate(first, second, operation) {
        first = parseFloat(first);
        second = parseFloat(second);

        switch (operation) {
            case '+':
                return (first + second).toString();
            case '-':
                return (first - second).toString();
            case '×':
                return (first * second).toString();
            case '÷':
                if (second !== 0) {
                    return (first / second).toString();
                } else {
                    alert('Division by zero is not allowed.');
                    clearAll();
                    return "0";
                }
            default:
                return second.toString();
        }
    }

    function clearAll() {
        firstInput = "";
        currentInput = "";
        operation = null;
        screen.innerText = "0";
    }
});
