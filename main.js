//seleccionar los elementos
let $form = document.querySelector(".form");
let $amountInput = document.getElementById("mortgageAmount");
let $termInput = document.getElementById("mortgageTerm");
let $rateInput = document.getElementById("interestRate");
let $emptyResultsContainer = document.querySelector(".empty-results"); 
let $completedResultsContainer = document.querySelector(".completed-results"); 
let $clearBtn = document.querySelector("clear-btn");


//hacer operaciones al dar click
$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let mortgageAmount = $amountInput.value;
    let mortgageterm = $termInput.value;
    let mortgageRate = $rateInput.value;
    let mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;
    //calculate
    let total = calculateMorgage(mortgageAmount, mortgageterm, mortgageRate, mortgageType);
    //show results
    console.log(total);
    
})

function calculateMortgage(amount, term, rate, type) {
    let amountPerMonth = 0;
    let ratePerMoth = rate / 12;
    let totalTerms = term * 12;
    if (type == "repayment") {
        amountPerMonth = amount * ((ratePerMoth * ( 1 + ratePerMoth)**totalTerms)/(( 1+ ratePerMoth)**totalTerms - 1));
    } else {
        
    }

    return amountPerMonth;
}
//M=P⋅(1+r)n−1r(1+r)n​

