import "../css/reset.css";
import "../css/style.css";
import "../css/queries.css";

import calcAmounts from "./calcAmounts";

/////////////////////
// Variables
let tipAmount = 15;

////////////////////
// Elements
const tipEl = document.querySelector(".radio-control");
const billIn = document.getElementById("bill"),
  customTipIn = document.getElementById("tipinput"),
  peopleIn = document.getElementById("people");
const tipOut = document.getElementById("tip-amount"),
  totalOut = document.getElementById("total");
const resetBtn = document.getElementById("reset");

////////////////////
// Events
// If bill input is changed
billIn.addEventListener("input", getAmounts);

// If people input is changed
peopleIn.addEventListener("input", getAmounts);

// If custom-tip input is changed
customTipIn.addEventListener("input", function () {
  // set custom value
  tipAmount = Number(customTipIn.value);

  getAmounts();
});

// If tip label container is clicked
tipEl.addEventListener("click", function (e) {
  const clickedTip = e.target.closest(".tip-label");
  // if a label was clicked
  if (clickedTip !== null) {
    // get the value
    const clickedTipValue = Number(clickedTip.control.value);

    // set tipAmount
    if (isNaN(clickedTipValue)) {
      // custom amount
      tipAmount = 0;
    } else {
      // non-custom amount
      tipAmount = clickedTipValue;
    }

    getAmounts();
  }
});

// If reset button is pressed
resetBtn.addEventListener("click", function () {
  console.log("----- RESET ------");

  // clear inputs
  billIn.value = "";
  peopleIn.value = "";
  customTipIn.value = "";

  // reset tip if it is a custom value
  if (document.querySelector("input[name='tip']:checked").value === "custom")
    tipAmount = 0;

  // update display
  getAmounts();
});

// If key is pressed
document.addEventListener("keydown", function (e) {
  // if the enter key is pressed
  if (e.code === "Enter") {
    // get element that is focused
    const focusedElement = document.activeElement;
    // if focus is on a tip label element
    if (focusedElement.classList.contains("tip-label")) {
      // get the related radio input element
      const tipInput = focusedElement.previousElementSibling;
      // check that element
      tipInput.checked = true;

      // update tipAmount
      const newTipValue = Number(tipInput.value);
      if (isNaN(newTipValue)) {
        tipAmount = 0;
      } else {
        tipAmount = newTipValue;
      }

      // update display
      getAmounts();
    }
  }
});

////////////////////
// Functions
function getAmounts() {
  // get inputs and convert to numbers
  let billAmount = Number(billIn.value);
  let peopleAmount = Number(peopleIn.value);

  // change bill value to 0 if it is negative
  if (billAmount < 0) {
    billAmount = 0;
    // update bill input
    billIn.value = billAmount;
  }

  // Limit bill to two decimal points
  if (billAmount % 1 !== 0 && (billAmount * 100) % 1 !== 0) {
    billAmount = Number(billAmount.toFixed(2));
    // update bill input
    billIn.value = billAmount;
  }

  // change custom tip value to positive number
  tipAmount = checkPositive(tipAmount);
  // change custom tip value to whole number
  tipAmount = checkDecimal(tipAmount);
  // update tip input
  customTipIn.value = tipAmount;

  // change people value to positive number
  peopleAmount = checkPositive(peopleAmount);
  // change people value to whole number
  peopleAmount = checkDecimal(peopleAmount);
  // update tip input
  peopleIn.value = peopleAmount;

  // show error if bill input is 0
  if (billAmount === 0) billIn.ariaInvalid = true;
  else billIn.ariaInvalid = false;

  // show error message if people are 0
  if (peopleAmount === 0) peopleIn.ariaInvalid = true;
  else peopleIn.ariaInvalid = false;

  console.log("------ INPUT EVENT ------");
  console.log("Bill: ", billAmount);
  console.log("Tip: ", tipAmount);
  console.log("People: ", peopleAmount);

  calcAmounts(billAmount, tipAmount, peopleAmount, tipOut, totalOut);
}

// check if number is negative
const checkPositive = (num) => (num < 0 ? 0 : num);

// check if number is decimal
const checkDecimal = (num) => Math.trunc(num);
