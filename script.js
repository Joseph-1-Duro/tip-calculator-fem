const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const tipInput = document.getElementById('tip-input');
const tipBtn = document.querySelectorAll('button[type=button]');
const resetBtn = document.querySelector('button[type=reset]');
const errorMessage = document.getElementById('error-message');

let bill, tip, people;

const handleInput = () => {    
    let billInputValue = billInput.value;
    bill = parseFloat(billInputValue)

    let peopleInputValue = peopleInput.value;
    people = parseFloat(peopleInputValue)

    let tipInputValue = tipInput.value;
    tip = parseFloat(tipInputValue) * 0.01 || tip;

    validateInput()
}

const validateInput = () => {
    if (people === 0) {
        errorMessage.style.display = 'block';
        return
    } else {
        errorMessage.style.display = 'none';
    }

    if (bill === 0 || tip === 0 || people <= 0) {
        return
    }

    // check for decimal in people input
    if(people % 1 !== 0) {
        return
    }

    if (billInput.value === '' || peopleInput.value === '') {
        return
    }

    calculateTip()
    calculateTotal()
}

const resetInput = () => {
    billInput.value = '';
    tipInput.value = '';
    peopleInput.value = '';
    document.querySelector('.active')?.classList.remove('active')
    
    document.getElementById('tip-amount').textContent = `$0.00`
    handleInput()

    document.getElementById('total').textContent = `$0.00`
}

const calculateTip = () => {
    let totalTip = (bill * tip) / people;
    totalTip =  parseFloat(totalTip.toFixed(2));

    if(isNaN(totalTip) !== true) {
        document.getElementById('tip-amount').textContent = `${totalTip}`
    }
}

const calculateTotal = () => {
    let overAllTip = bill * tip;
    let billSum = bill + overAllTip;
    let individualBill = billSum / people;
    let totalBill = parseFloat(individualBill).toFixed(2)

    if (isNaN !== true) {
        document.getElementById('total').textContent = `$${totalBill}`
    }
}

billInput.addEventListener('input', handleInput);
peopleInput.addEventListener('input', handleInput);
tipInput.addEventListener('input', handleInput);
resetBtn.addEventListener('click', resetInput);

tipInput.addEventListener('click', () => {
    document.querySelector('.active')?.classList.remove('active')
})

tipBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        tip = parseFloat(btn.innerHTML) * 0.01

        // setting and removing active class
        document.querySelector('.active')?.classList.remove('active')
        e.currentTarget.classList.add('active');

        validateInput()
    })
})