let scrollWrapper = document.querySelector(".scroll-wrapper");
let expression = document.querySelector("#expression");
let ac = document.querySelector("#ac");
let plusOrMinus = document.querySelector("#plusOrMinus");
let dot = document.querySelector("#dot");
let equal = document.querySelector("#equal");

const nums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "eight",
  "seven",
  "nine",
];
let numsElements = [];
for (let num of nums) {
  numsElements.push(document.getElementById(num));
}

const arthmetic = [
  "percent",
  "division",
  "multiplication",
  "substraction",
  "addition",
];
let arthmeticElements = [];
for (let arth of arthmetic)
  arthmeticElements.push(document.getElementById(arth));

function displayNum(evt) {
  if (expression.innerText === "0") {
    expression.innerText = evt.srcElement.innerText;
  } else {
    expression.innerText += evt.srcElement.innerText;
  }
  adjustFontSize();
}

let arthmeticOperations = ["÷", "×", "−", "+", "%"];
function displayArth(evt) {
  if (arthmeticOperations.includes(expression.innerText.at(-1))) {
    expression.innerText =
      expression.innerText.slice(0, -1) + evt.srcElement.innerText;
  } else {
    expression.innerText += evt.srcElement.innerText;
  }
  adjustFontSize();
}

for (let numElement of numsElements)
  numElement.addEventListener("click", displayNum);

for (let arthmeticElement of arthmeticElements)
  arthmeticElement.addEventListener("click", displayArth);

ac.addEventListener("click", () => {
  expression.innerText = "0";
  adjustFontSize();
});

plusOrMinus.addEventListener("click", () => {
  if (arthmeticOperations.includes(expression.innerText.at(-1))) return;

  let n = expression.innerText.length;

  if (expression.innerText.at(-1) !== ")") {
    let i = n - 2;
    for (i; i >= 0; --i) {
      if (arthmeticOperations.includes(expression.innerText.at(i))) {
        break;
      }
    }

    // handling case where n - 2 < 0 or no arthemetic operations;
    expression.innerText =
      expression.innerText.slice(0, i + 1) +
      "(−" +
      expression.innerText.slice(i + 1, n) +
      ")";
  } else {
    for (let i = n - 4; i >= 0; --i) {
      if (expression.innerText.at(i) === "(") {
        expression.innerText =
          expression.innerText.slice(0, i) +
          expression.innerText.slice(i + 2, n - 1);
        break;
      }
    }
  }

  adjustFontSize();
});

dot.addEventListener("click", () => {
  let dotFound = false;
  let i = expression.innerText.length - 1;
  while (i >= 0) {
    if (arthmeticOperations.includes(expression.innerText.at(i))) {
      break;
    }

    if (expression.innerText.at(i) === ".") {
      dotFound = true;
      break;
    }

    --i;
  }

  if (!dotFound) {
    expression.innerText += ".";
  }
  adjustFontSize();
});

equal.addEventListener("click", () => {
  let exp = expression.innerText;
  exp = exp.replaceAll("÷", "/").replaceAll("×", "*").replaceAll("−", "-");

  try {
    let result = eval(exp);

    if (result === Infinity || result == -Infinity || Number.isNaN(result)) {
      throw new Error(SyntaxError);
    }

    result = result.toString().replaceAll("-", "−");

    expression.innerText = result;
  } catch (e) {
    console.log(e);
    alert("Invalid Expression. Enter valid expression!");
    expression.innerText = "0";
  }

  adjustFontSize();
});

const maxFontSize = 64;
const minFontSize = 32;

function adjustFontSize() {
  let fontSize = maxFontSize;
  expression.style.fontSize = fontSize + "px";

  while (
    expression.scrollWidth > expression.clientWidth &&
    fontSize > minFontSize
  ) {
    fontSize -= 1;
    expression.style.fontSize = fontSize + "px";
  }

  expression.scrollLeft = expression.scrollWidth;
}
