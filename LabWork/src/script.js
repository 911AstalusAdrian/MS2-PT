function addItem() {
    var textboxValue = document.getElementById("textbox").value;
    var list = document.getElementById("list");
    var newItem = document.createElement("p");
    newItem.classList.add("element");
    newItem.innerText = textboxValue;
    list.appendChild(newItem);
    document.getElementById("textbox").value = "";
  }

function clearLists() {
    var list = document.querySelector("#list");
    var generatedList = document.querySelector("#generatedList");
    list.innerHTML = "";
    generatedList.innerHTML = "";
}

function generateList() {

    // clearLists();

    var list;
    const generatedList = document.getElementById('generatedList');
    const selectChoice = document.getElementById("listOptions").value;
    const listValues = document.querySelectorAll("p.element");

    if (selectChoice == "ol") {
        list = document.createElement("ol");
    } else {
        list = document.createElement("ul");
    }

    listValues.forEach((value) => {
        var element = document.createElement("li");
        element.textContent = value.textContent
        list.appendChild(element)
    });

    generatedList.appendChild(list);
}