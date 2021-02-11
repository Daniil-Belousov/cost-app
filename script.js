let allCosts = [];
let textI = '';
let valueI = null;
let inputText = null;
let inputValue = null;

window.onload = function init () {
    inputText = document.getElementById('cost-name');
    inputValue = document.getElementById('cost-value');
    inputText.addEventListener('change', updateText);
    inputValue.addEventListener('change', updateValue);

}

onClickButton = () => {
    if(textI === '' || valueI === null) {
        alert("пожалуйста введите значение!")
    } else {
    allCosts.push({
        text: textI,
        summa: valueI
    });
    console.log(allCosts)
    valueI = null;
    textI = '';
    inputText.value = '';
    inputValue.value = null;
    render();
}
};

updateText = (event) => {
    textI= event.target.value;
};

updateValue = (event) => {
    valueI = event.target.value;
};

render = () => {
    const content = document.getElementById('wrap-task-container');
    while(content.firstChild) {
        content.removeChild(content.firstChild);
    } 
    allCosts.map((item,index) => {
        const container = document.createElement('div');
        container.id = `cost-${index}`;

        const text = document.createElement('p');
        text.innerText = item.text;
        container.appendChild(text);

        const money = document.createElement('p');
        money.innerText = item.summa;
        container.appendChild(money);

        content.appendChild(container);
    })
}