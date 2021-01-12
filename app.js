
const currencyElementOne = document.getElementById('currency-1');
const currencyElementTwo = document.getElementById('currency-2');
const amountOne    = document.getElementById('amount-one')
const amountTwo    = document.getElementById('amount-two')

const rateEl    = document.getElementById('rate')
const swapEl    = document.getElementById('swap')

// Fetch exchange rate and update the dom
function calculate() {
    const currencyOne = currencyElementOne.value;
    const currencyTwo = currencyElementTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/c9cbf0520a0ffd80ff5c809b/latest/${currencyOne}`)
    .then(response => response.json())
    .then(data =>{
        const rate = data.conversion_rates[currencyTwo];
        console.log(rate);

        rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
        
        amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

// Event Listners 
currencyElementOne.addEventListener('change', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
swapEl.addEventListener('click', () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
})

calculate();