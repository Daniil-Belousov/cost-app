let allCosts = [];
let textI = '';
let valueI = null;
let inputText = null;
let inputValue = null;
let indexEdit = null;
let total = 0;

window.onload = function init () {
    inputText = document.getElementById('cost-name');
    inputValue = document.getElementById('cost-value');
    inputText.addEventListener('change', updateText);
    inputValue.addEventListener('change', updateValue);
    render();
}

updateText = (event) => {
    textI= event.target.value;
};
updateValue = (event) => {
    valueI = event.target.value;
};

onClickButton = () => {
    if(textI === '' || valueI === null) {
        alert("пожалуйста введите значение!")
    } else {
    allCosts.push({
        text: textI,
        summa: valueI
    });
    total = total + Number(valueI);
    valueI = null;
    textI = '';
    inputText.value = '';
    inputValue.value = null;
    render();
}
};

render = () => {
    // const amountContainer = document.querySelector('#wrap-all-summ');
    const amount = document.querySelector('.summa');
    amount.innerText = `Итого: ${total} р.`;
    // amount.className = 'summa';
    // amount.innerText = `Итого: ${total} р.`
    // amountContainer.appendChild(amount);

    // while(amountContainer.firstChild) {
    //     amountContainer.removeChild(amountContainer.firstChild)
    // }

    

    
    const content = document.getElementById('wrap-task-container');
    while(content.firstChild) {
        content.removeChild(content.firstChild);
    } 
    allCosts.map((item,index) => {
        const container = document.createElement('div');
        container.id = `cost-${index}`;
        container.className = 'cost-container';

        const wrapText = document.createElement('div');
        wrapText.className = "wrap-text";
        container.appendChild(wrapText);

        const text = document.createElement('p');
        text.innerText = `${index+1}) ` + item.text;
        text.className = 'cost-text cost-cost';
        wrapText.appendChild(text);

        const money = document.createElement('p');
        money.innerText = item.summa + ' р.';
        money.className = 'cost-money cost-cost';
        wrapText.appendChild(money);

        const wrapBtn = document.createElement('div');
        wrapBtn.className = "wrap-buttons";
        container.appendChild(wrapBtn);

        const imageEdit = document.createElement('img');
        imageEdit.src = 'images/pencil.svg';
        imageEdit.className = 'cost-btn edit-btn'
        wrapBtn.appendChild(imageEdit);

        const imageDelete = document.createElement('img');
        imageDelete.src = 'images/trash.svg';
        imageDelete.className = 'cost-btn delete-btn';
        wrapBtn.appendChild(imageDelete);

        content.appendChild(container);
    })
}