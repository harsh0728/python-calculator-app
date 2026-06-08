let display = document.getElementById('display');
let resultDisplay = document.getElementById('resultDisplay');

function appendToDisplay(value) {
    // Handle closing parenthesis
    if (value === '( )') {
        value = '()';
        if (display.value.endsWith('(')) {
            display.value += '(';
            return;
        } else {
            display.value += ')';
            return;
        }
    }
    
    display.value += value;
    clearResultDisplay();
}

function clearDisplay() {
    display.value = '';
    clearResultDisplay();
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    clearResultDisplay();
}

function clearResultDisplay() {
    resultDisplay.textContent = '';
    resultDisplay.classList.remove('success', 'error');
}

async function calculate() {
    const expression = display.value.trim();
    
    if (!expression) {
        showError('Enter an expression');
        return;
    }
    
    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ expression: expression })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Format the result
            let result = data.result;
            
            // Handle very large or very small numbers
            if (Math.abs(result) < 0.0001 && result !== 0) {
                result = result.toExponential(6);
            } else if (Math.abs(result) > 1e10) {
                result = result.toExponential(6);
            } else {
                // Round to 10 decimal places to avoid floating point errors
                result = Math.round(result * 10000000000) / 10000000000;
            }
            
            display.value = result;
            showSuccess(`${expression} = ${result}`);
        } else {
            showError(data.error);
        }
    } catch (error) {
        showError('Connection error: ' + error.message);
    }
}

function showSuccess(message) {
    resultDisplay.textContent = message;
    resultDisplay.classList.remove('error');
    resultDisplay.classList.add('success');
}

function showError(message) {
    resultDisplay.textContent = message;
    resultDisplay.classList.remove('success');
    resultDisplay.classList.add('error');
}

// Allow Enter key to calculate
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculate();
    }
});

// Allow Backspace to delete
document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});
