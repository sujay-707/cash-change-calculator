const billAmount = document.querySelector("#billamount");
const cashGiven = document.querySelector("#cashgiven");
const checkButton = document.querySelector("#checkbutton");
const errorMessage = document.querySelector("#errormessage");
const noOfNotes = document.querySelectorAll(".noofnotes");
const totalAmountText = document.querySelector("#totalamount");

const notes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
const MAX_AMOUNT = 1000000; // 10 lakh safety cap

/* Enable button only when inputs exist */
function toggleButtonState() {
    checkButton.disabled = !(billAmount.value && cashGiven.value);
}

billAmount.addEventListener("input", toggleButtonState);
cashGiven.addEventListener("input", toggleButtonState);

/* Main logic */
checkButton.addEventListener("click", () => {
    hideMessage();
    clearNotes();

    const bill = Number(billAmount.value);
    const cash = Number(cashGiven.value);

    if (bill <= 0 || cash <= 0) {
        showMessage("❌ Amounts must be greater than zero");
        return;
    }

    if (bill > MAX_AMOUNT || cash > MAX_AMOUNT) {
        showMessage("❌ Amount too large. Please enter a reasonable value.");
        return;
    }

    if (cash < bill) {
        showMessage("❌ Cash should be greater than or equal to bill amount");
        return;
    }

    const returnAmount = cash - bill;
    animateTotal(returnAmount);
    calculateChange(returnAmount);
});

/* Calculate notes */
function calculateChange(amount) {
    notes.forEach((note, index) => {
        const count = Math.floor(amount / note);
        amount %= note;

        const noteElement = noOfNotes[index];
        noteElement.innerText = count;

        const card = noteElement.parentElement;
        card.classList.toggle("active", count > 0);
    });
}

/* Animate total amount */
function animateTotal(amount) {
    let current = 0;
    const step = Math.max(1, Math.floor(amount / 20));

    const interval = setInterval(() => {
        current += step;
        if (current >= amount) {
            current = amount;
            clearInterval(interval);
        }
        totalAmountText.innerText = `₹${current}`;
    }, 20);
}

/* Reset */
function clearNotes() {
    noOfNotes.forEach(n => {
        n.innerText = "0";
        n.parentElement.classList.remove("active");
    });
    totalAmountText.innerText = "₹0";
}

/* Messages */
function hideMessage() {
    errorMessage.style.display = "none";
}

function showMessage(msg) {
    errorMessage.style.display = "block";
    errorMessage.innerText = msg;
}
