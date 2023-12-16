// calculate and display amounts
function calcAmounts(bill, tip, people, tipOutput, totalOutput) {
  if (bill === 0 || people === 0) {
    // if people or bill is 0
    tipOutput.innerHTML = `$0.00`;
    totalOutput.innerHTML = `$0.00`;
  } else {
    // otherwise calculate values
    const amountPerPerson = (bill / people).toFixed(2);
    const tipPerPerson = ((bill * (tip / 100)) / people).toFixed(2);

    // and display
    totalOutput.innerHTML = `$${amountPerPerson}`;
    tipOutput.innerHTML = `$${tipPerPerson}`;
  }
}

export default calcAmounts;
