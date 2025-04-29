const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      clear();
      return;
    } else if (isOperator(value)) {
      handleOperator(value)
      return;
    } else if (value === '=') {
      handleEquals();
      return;
    }

    handleDigit(value);
  })
})

/**
 * Очищает все данные калькулятора и экран.
 */
function clear(){
  firstNumber = '';
  secondNumber = '';
  operator = '';
  result = '';
  display.value = '';
}

/**
 * Проверяет, является ли символ оператором (+, -, *, /).
 * @param {string} char - Символ, введённый пользователем.
 * @returns {boolean} - true, если символ — оператор.
 */
function isOperator(char) {
  return ['+', '-', '*', '/', '%'].includes(char);
}

/**
 * Обрабатывает нажатие оператора:
 * - Если уже есть выражение, вычисляет результат.
 * - Устанавливает текущий оператор.
 * @param {string} value - Оператор (+, -, *, /).
 */
function handleOperator(value) {
  if(!firstNumber) {
    return;
  } else if (operator && secondNumber) {
    calculate();
    firstNumber = result.toString();
    secondNumber = '';
  }

  operator = value;
}

/**
 * Обрабатывает нажатие кнопки "=":
 * Если все элементы выражения введены, выполняет вычисление и отображает результат.
 */
function handleEquals() {
  if (firstNumber && operator && secondNumber) {
    calculate();
    display.value = result;
    firstNumber = result.toString();
    secondNumber = '';
    operator = '';
  }
}

/**
 * Обрабатывает нажатие цифры или точки.
 * Добавляет к первому или второму числу, в зависимости от состояния.
 * @param {string} value - Цифра или точка, введённая пользователем.
 */
function handleDigit(value) {
  if (value === '.' && (!operator ? firstNumber.includes('.') : secondNumber.includes('.'))) {
    return;
  }

  if (!operator) {
    firstNumber += value;
    display.value = firstNumber;
  } else {
    secondNumber += value;
    display.value = secondNumber;
  }
}

/**
 * Выполняет вычисление двух чисел на основе текущего оператора.
 * Сохраняет результат в переменную result.
 */
function calculate() {
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);

  switch (operator) {
    case '+':
     result = a + b;
     break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = b !== 0 ? a / b : 'Error...';
      break;
    case '%':
      result = (a * b) / 100
      break;
      default:
        result = 'Error...'
  }
  return result;
}
