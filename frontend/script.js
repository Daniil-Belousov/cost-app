let allCosts = [];
let textI = "";
let valueI = null;
let inputText = null;
let inputValue = null;
let indexEdit = null;
let total = 0;

window.onload = async function init() {
  inputText = document.getElementById("cost-name");
  inputValue = document.getElementById("cost-value");
  inputText.addEventListener("change", updateText);
  inputValue.addEventListener("change", updateValue);
    const resp = await fetch('http://localhost:8000/allCosts', {
        method: "GET"
    });

    let result = await resp.json();
    allCosts = result.data;
  render();
};

updateText = (event) => {
  textI = event.target.value;
};

updateValue = (event) => {
  valueI = event.target.value;
};

onClickButton = async () => {
  if (textI === "" || valueI === null) {
    alert("пожалуйста введите значение!");
  } else {
    const resp = await fetch('http://localhost:8000/addNewCost', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            text: textI,
            summa: valueI
        })  
    });
    let result = await resp.json();
    allCosts.push(result.result)
    valueI = null;
    textI = "";
    inputText.value = "";
    inputValue.value = null;
    render();
  }
};

render = () => {
  total = 0;
  allCosts.forEach(element => {
    total = total + element.summa;
  });
  
  const amount = document.querySelector(".summa");
  amount.innerText = `Итого: ${total} р.`;

  const content = document.getElementById("wrap-task-container");
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allCosts.map((item, index) => {
      let saveValue = item.summa;
      let saveText = item.text;
    const container = document.createElement("div");
    container.id = `cost-${index}`;
    container.className = "cost-container";

    const wrapText = document.createElement("div");
    wrapText.className = "wrap-text";
    container.appendChild(wrapText);

    if (index === indexEdit) {
      const inputEditText = document.createElement("input");
      inputEditText.type = "text";
      inputEditText.value = item.text;
      inputEditText.className = "editNow textNow";
      inputEditText.addEventListener("change", updateCostText);
      wrapText.appendChild(inputEditText);

      const inputEditValue = document.createElement("input");
      inputEditValue.type = "number";
      inputEditValue.value = item.summa;
      inputEditValue.className = "editNow valueNow";
      inputEditValue.addEventListener("change", updateCostValue);
      wrapText.appendChild(inputEditValue);

    } else {
      const text = document.createElement("p");
      text.innerText = `${index + 1}) ${item.text}`;
      text.className = "cost-text cost-cost";
      wrapText.appendChild(text);

      const money = document.createElement("p");
      money.innerText = `${item.summa} р.`;
      money.className = "cost-money cost-cost";
      wrapText.appendChild(money);
    }

    const wrapBtn = document.createElement("div");
    wrapBtn.className = "wrap-buttons";
    container.appendChild(wrapBtn);

    if (indexEdit === index) {
      const imageDone = document.createElement("img");
      imageDone.src = "images/done.svg";
      imageDone.className = "cost-btn edit-btn";
      wrapBtn.appendChild(imageDone);
      imageDone.onclick = function () {
        onCLickDone();
      };
    } else {
      const imageEdit = document.createElement("img");
      imageEdit.src = "images/pencil.svg";
      imageEdit.className = "cost-btn edit-btn";
      wrapBtn.appendChild(imageEdit);
      imageEdit.onclick = function () {
        indexEdit = index;
        render();
      };
    }

    if (indexEdit === index) {
      const imageClose = document.createElement("img");
      imageClose.src = "images/close.svg";
      imageClose.className = "cost-btn delete-btn";
      wrapBtn.appendChild(imageClose);  
      imageClose.onclick = function () {
        indexEdit = index;
        allCosts[indexEdit].summa = saveValue;
        allCosts[indexEdit].text = saveText;
        indexEdit = null;
        render()
      };
    } else {
      const imageDelete = document.createElement("img");
      imageDelete.src = "images/trash.svg";
      imageDelete.className = "cost-btn delete-btn";
      wrapBtn.appendChild(imageDelete);
      imageDelete.onclick = function () {
        onClickDelete(index,item);
      };
    }
    content.appendChild(container);
  });
};

onClickDelete = async (index,item) => {
  let _id = allCosts[index]._id;
  const resp = await fetch(`http://localhost:8000/deleteCost?_id=${_id}`, {
    method: "DELETE",
});
let result = await resp.json();
allCosts = result.data;
render();
};

updateCostText = (event) => {
  allCosts[indexEdit].text = event.target.value;
};

updateCostValue = (event) => {
  allCosts[indexEdit].summa = event.target.value;
};

onCLickDone = async() => {
  const resp = await fetch('http://localhost:8000/editCost', {
    method: "PATCH",
    headers: {
        "Content-Type": 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        _id: allCosts[indexEdit]._id,
        text: allCosts[indexEdit].text,
        summa: Number(allCosts[indexEdit].summa)
    })
});
let result = await resp.json();
allCosts[indexEdit] = result.data[indexEdit];
  indexEdit = null;
  render();
};
