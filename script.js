'use strict';

// input selectors
const billAmountInput = document.querySelector('.bill-amount');
const tipPercentageInput = document.querySelector('.tip-percentage');
const divideAmountInput = document.querySelector('.divide-amount');
const check = document.querySelector('.check');

// elements selector
const answerContainer = document.querySelector('.answer');

// btn selectors
const calcBtn = document.querySelector('.calc-btn');
const clearBtn = document.querySelector('.clear-btn');

let tipPerPerson;
let total;
let totalEachPerson;

function defaultPeople(numPeople) {
  if (numPeople === '') return 1;
  return numPeople;
}

function calcTip(billAmount, tipPercent) {
  const tip = tipPercent / 100;
  const answer = billAmount * tip;
  tipPerPerson = tipEachPerson(answer, divideAmountInput.value);
  total = calcTotal(answer, billAmount);
  totalEachPerson = totalPriceEachPerson(
    tipPerPerson,
    total,
    divideAmountInput.value
  );
  return answer;
}

function calcTotal(tip, bill) {
  return tip + bill;
}

function tipEachPerson(tip, numPeople) {
  const val = defaultPeople(numPeople);
  return tip / val;
}

function totalPriceEachPerson(tipPerPerson, total, numPeople) {
  const val = defaultPeople(numPeople);
  const totalPerPerson = total / val;
  return tipPerPerson + totalPerPerson;
}

function injectAnswers(e) {
  e.preventDefault();

  if (isNaN(billAmountInput.value)) {
    answerContainer.innerHTML =
      '<p class="calc-label">Please insert a number!</p>';
    return;
  }

  const tip = calcTip(+billAmountInput.value, +tipPercentageInput.value);

  answerContainer.innerHTML = ` 
        <table class="answer-table">
          <tr>
            <th>Tip Total:</th>
            <th>£ ${check.checked ? Math.round(tip) : tip.toFixed(2)}</th>
          </tr>

          ${
            divideAmountInput.value === ''
              ? ''
              : `<tr>
            <th>Tip Per Person:</th>
            <th>£ ${
              tipPerPerson >= 1 && check.checked
                ? Math.round(tipPerPerson)
                : tipPerPerson.toFixed(2)
            }           
            </th>
          </tr>
          `
          }

          <tr>
            <th>Total (Bill + Tip):</th>
            <th>£ ${check.checked ? Math.round(total) : total.toFixed(2)}</th>
          </tr>

          ${
            divideAmountInput.value === ''
              ? ''
              : `<tr>
            <th>Total Per Person:</th>
            <th>£ ${
              check.checked
                ? Math.round(totalEachPerson)
                : totalEachPerson.toFixed(2)
            }</th>
          </tr>`
          }
      </table> 
`;
}

function clearAnswers() {
  answerContainer.innerHTML = '';
  billAmountInput.value = '';
  tipPercentageInput.value = '';
  divideAmountInput.value = '';
  if (check.checked) check.checked = false;
}

// Event listeners
calcBtn.addEventListener('click', injectAnswers);
clearBtn.addEventListener('click', clearAnswers);
