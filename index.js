// How to store the output???
// We can create a calculator class at the top of the File, put inside a constructor that take all inputs and all calculation functions
// This constructor is going to take the previousOperandTextElement and currentOperandTextElement in order to determine where to place the display text for the calculator (The screen that show results)
// reset inputs as soon as we create the calculator : this.clear
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined 
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    // appendNumber is a function that determines what will occur every time a user clicks on a number to add to the display
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // this function controls what will happen when a user click on any operation button. The first thing is to set this.operation equal to the operation you passed in so that your calculator is aware of what operation it desires to use when computing the value.
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    // this function takes the values inside your calculator class (with constructor) and display result
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }
    // this function lets us update the values inside of the output
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {this.previousOperandTextElement.innerText = ''};
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// based on the prototype (class Calculator), we create a constant calculator. this helps hook all the variables and make them operate on the Calculator object.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// select a number button, then loop over all these different buttons. We can also add an EventListener on the buttons using button.addEventListener. This case, we add a number to the calculator by calling appendNumber function + button.innerText to display. Afterwards, call the calculator.updateDisplay method to ensure the displayed values are constantly updated every time we click on button on the calculator.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


// select operations button: same technique as select number buttons. However, instead of appendNumber function, we will use chooseOperation(button.innerText) and update the display using calculator.updateDisplay.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Before calling compute() function, we should talk about Equals button. Adding an EventListener will invoke the compute() function and return the results. Then, we need to update the calculator's display. When you click the Equals button, it will call the compute() function.
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


//Clear things out
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//Delete
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key === '.') {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calculator.chooseOperation(event.key)
      calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculator.compute()
      calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      calculator.delete()
      calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      calculator.clear()
      calculator.updateDisplay()
    }
  
});