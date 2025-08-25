//seleccionar los elementos
let $form = document.querySelector(".form");
let $amountInput = document.getElementById("mortgageAmount");
let $termInput = document.getElementById("mortgageTerm");
let $rateInput = document.getElementById("interestRate");
let $emptyResultsContainer = document.querySelector(".empty-results"); 
let $completedResultsContainer = document.querySelector(".completed-results"); 
let $clearBtn = document.querySelector(".clear-btn");

$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let mortgageAmount = $amountInput.value;
    let mortgageterm = $termInput.value;
    let mortgageRate = $rateInput.value;
    let mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;
    //calculate
    let [amountPerMonth, total] = calculateMortgage(mortgageAmount, mortgageterm, mortgageRate, mortgageType);
    //show results
    showResults(amountPerMonth, total);
})

$clearBtn.addEventListener('click', (e) => {
    $amountInput.value = '';
    $termInput.value = '';
    $rateInput.value = '';
    hideResults();
    
})

function calculateMortgage(amount, term, rate, type) {
    let amountPerMonth = 0;
    let totalAmount = 0;
    let ratePerMoth = (rate/100) / 12;
    let totalTerms = term * 12;
    if (type == "repayment") {
        amountPerMonth = amount * ((ratePerMoth * ( 1 + ratePerMoth)**totalTerms)/(( 1+ ratePerMoth)**totalTerms - 1));
        totalAmount = amountPerMonth * totalTerms;
        amountPerMonth = amountPerMonth .toFixed(2);
        totalAmount = totalAmount .toFixed(2);
    } else {
        
    }

    return [amountPerMonth, totalAmount];
}

function showResults(amountPerMonth, total) {
    $emptyResultsContainer.style.display = "none";
    $monthlyRepayParagraph = $completedResultsContainer.querySelector(".monthly-repay").innerText = amountPerMonth;
    $totalRepayParagraph = $completedResultsContainer.querySelector(".total-repay").innerText = total;
    $completedResultsContainer.style.display = "block";
}

function hideResults() {
    $emptyResultsContainer.style = "flex";
    $completedResultsContainer.style = "none";
}

function clearAll() {

}

