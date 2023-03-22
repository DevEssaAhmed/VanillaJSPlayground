const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  //! Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    itemToEdit.remove();
    isEditMode = false;

    removeItemFromStorage(itemToEdit.textContent);
  } else {
    if (checkIfItemExists(newItem)) {
      alert("Item already exists!");
      return;
    }
  }

  //! Adding item to DOM
  addItemToDOM(newItem);
  //! Adding item to Local Storage
  addItemToStorage(newItem);

  checkUI();
  itemInput.value = "";
}

// ? Create Button Function
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}
// Function addItem to DOM
function addItemToDOM(item) {
  //* Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  //? Add li to DOM
  itemList.appendChild(li);
}

// Function addItem to Storage
function addItemToStorage(item) {
  // let itemsFromStorage;

  // if (localStorage.getItem("items") === null) {
  //   itemsFromStorage = [];
  // } else {
  //   itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  //* Better way of doing it
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  // Convert to JSON string and set to Local Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//! Get items from storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  // item.style.color = '#ccc'
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  formBtn.style.backgroundColor = "#228822";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove Item from DOM
    item.remove();

    // Remove Item from Storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => {
    i !== item;
  });

  // Re-set to Local Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clearing items from Local Storage
  localStorage.removeItem("items");
  checkUI();

  //  itemList.innerHTML = ''
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
}

function checkUI() {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearButton.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    itemFilter.style.display = "block";
  }
  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Update Item";
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

// Initialize App
function init() {
  //! Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
