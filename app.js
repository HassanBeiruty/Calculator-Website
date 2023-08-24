document.addEventListener("DOMContentLoaded", function () {
    const expressionDisplay = document.getElementById("expression");
    const resultDisplay = document.getElementById("result");
    const buttons = document.querySelectorAll(".buttons button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;
            const lastChar = expressionDisplay.textContent.slice(-1);

            if (buttonText === "=") {
                try {
                    const expression = expressionDisplay.textContent;
                    const result = evaluateExpression(expression);
                    resultDisplay.textContent = result;
                } catch (error) {
                    resultDisplay.textContent = "Error";
                }
            } else if (buttonText === "C") {
                expressionDisplay.textContent = "";
                resultDisplay.textContent = "";
            } else if (buttonText === "⌫") {
                expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1);
            } else if (
                isOperator(lastChar) && isOperator(buttonText) ||
                lastChar === "." && isOperator(buttonText)
            ) {
                // If there are two consecutive operators or operator after a dot, remove the last character
                expressionDisplay.textContent = expressionDisplay.textContent.slice(0, -1);
            } else {
                expressionDisplay.textContent += buttonText;
            }
        });
    });

    function evaluateExpression(expression) {
        try {
            return eval(expression);
        } catch (error) {
            throw new Error("Invalid expression");
        }
    }

    function isOperator(char) {
        return char === "+" || char === "-" || char === "*" || char === "/";
    }
});
