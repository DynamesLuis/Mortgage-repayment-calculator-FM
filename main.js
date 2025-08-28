//seleccionar los elementos
let $form = document.querySelector(".form");
let $amountInput = document.getElementById("mortgageAmount");
let $termInput = document.getElementById("mortgageTerm");
let $rateInput = document.getElementById("interestRate");
let $emptyResultsContainer = document.querySelector(".empty-results");
let $radioInputs = document.querySelectorAll('input[name="mortgageType"]');
let $completedResultsContainer = document.querySelector(".completed-results");
let $radioMsg = document.querySelector(".radio-msg");
let $clearBtn = document.querySelector(".clear-btn");
let isSomeInputEmpty = false;

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let someSelected = Array.from($radioInputs).some(radio => radio.checked);
    checkIsEmpty(someSelected);
    if (isSomeInputEmpty) return;

    let mortgageAmount = $amountInput.value;
    let mortgageterm = $termInput.value;
    let mortgageRate = $rateInput.value;
    let mortgageType = "";
    if (someSelected) mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;
    //calculate
    let [amountPerMonth, total] = calculateMortgage(mortgageAmount, mortgageterm, mortgageRate, mortgageType);
    //show results
    showResults(amountPerMonth, total);
})

$clearBtn.addEventListener('click', (e) => {
    clearAll();
    hideResults();

})

function calculateMortgage(amount, term, rate, type) {
    let amountPerMonth = 0;
    let totalAmount = 0;
    let ratePerMoth = (rate / 100) / 12;
    let totalTerms = term * 12;
    if (type == "repayment") {
        amountPerMonth = amount * ((ratePerMoth * (1 + ratePerMoth) ** totalTerms) / ((1 + ratePerMoth) ** totalTerms - 1));
        totalAmount = amountPerMonth * totalTerms;
        amountPerMonth = amountPerMonth.toFixed(2);
        totalAmount = totalAmount.toFixed(2);
    } else {
        amountPerMonth = amount * ratePerMoth;
        totalAmount = amountPerMonth * totalTerms;
        amountPerMonth = amountPerMonth.toFixed(2);
        totalAmount = totalAmount.toFixed(2);
    }

    return [amountPerMonth, totalAmount];
}

function showResults(amountPerMonth, total) {
    $emptyResultsContainer.style.display = "none";
    $monthlyRepayParagraph = $completedResultsContainer.querySelector(".monthly-repay").innerText = "£" + amountPerMonth;
    $totalRepayParagraph = $completedResultsContainer.querySelector(".total-repay").innerText = "£" + total;
    $completedResultsContainer.style.display = "block";
}

function hideResults() {
    $emptyResultsContainer.style = "flex";
    $completedResultsContainer.style = "none";
}

function clearAll() {
    $amountInput.value = '';
    $termInput.value = '';
    $rateInput.value = '';
    $radioInputs.forEach((input) => {
        input.checked = false;
    })
}

function checkIsEmpty(someSelected) {
    if ($amountInput.value == "") {
        $amountInput.classList.add("empty");
        isSomeInputEmpty = true;
    }

    if ($rateInput.value == "") {
        $rateInput.classList.add("empty");
        isSomeInputEmpty = true;
    }
    if ($termInput.value == "") {
        $termInput.classList.add("empty");
        isSomeInputEmpty = true;
    }
    if (!someSelected) {
        $radioMsg.classList.add("show");
        isSomeInputEmpty = true;
    }

    setTimeout(() => {
        $amountInput.classList.remove("empty")
        $rateInput.classList.remove("empty");
        $termInput.classList.remove("empty");
        $radioMsg.classList.remove("show");
        isSomeInputEmpty = false;
    }, "3000");

}

