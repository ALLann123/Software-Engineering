const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "C") {
            //Reset everything
            currentInput = "";
            display.value = "";
        } else if (value === "=") {
            //Evaluate our expression with basic error handling
            try {
                currentInput = eval(currentInput).toString();
                display.value = currentInput;
            } catch (error) {
                display.value = "Error";
                currentInput = "";
            }
        } else {
            //Append the clicked value and update display
            currentInput += value;
            display.value = currentInput;
        }
    });
});