const input = document.getElementById('input');
const addButton = document.getElementById('add_item');
const search = document.getElementById('filter');
const ul = document.getElementById('lists');
const li = document.getElementById('item');
const searchDiv = document.getElementById('search');
// const cross = document.getElementById('cross');
const clear = document.getElementById('clear');
const form = document.getElementById('item-form');
let isEdit = false;

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    // console.log(itemsFromStorage);
    itemsFromStorage.forEach(item => addItemToDOM(item));

    checkUI();
}

function onAddItemSubmit(e){
        e.preventDefault();

        const newItem = input.value;

        if(newItem ===''){
            alert('Please add an item');
            return;
        }

        // check for edit mode
        if(isEdit){
            const itemToEdit = ul.querySelector('.text-red-400');

            // console.log('on add submit '+ itemToEdit.textContent);

            removeItemFromStorage(itemToEdit.textContent.trim());
            itemToEdit.classList.remove('.text-red-400');

            itemToEdit.remove();
            isEdit = false;

        }else{
            if(chekIfExists(newItem)){
                alert('That item already exists');
                return;
            }
        }

        
        // const list = document.createElement('li');
        // const button = createButton();
        // list.className = 'list flex rounded-lg border-b-4 bg-white px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-500 hover:text-white';

        // list.appendChild(document.createTextNode(newItem));

        // list.appendChild(button);
        // ul.appendChild(list);
        addItemToDOM(newItem);

        addItemToStorage(newItem);

        input.value = '';


        checkUI();

        // console.log(list);
}

function chekIfExists(item){
    const itemsFromStorage = getItemsFromStorage();
    // if(itemsFromStorage.includes(item)){
    //     return true;
    // }else{
    //     return false;
    // }

    return itemsFromStorage.includes(item);
}

function addItemToDOM(item){

    const list = document.createElement('li');
    const button = createButton();
    list.className = 'list flex rounded-lg border-b-4 bg-white px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-500 hover:text-white';

    list.appendChild(document.createTextNode(item));

    list.appendChild(button);
    ul.appendChild(list);
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();

    // if(localStorage.getItem('items') === null){
    //     itemsFromStorage = [];
    // }else{
    //     itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    // }

    //ADD NEW ITEM TO ARRAY
    itemsFromStorage.push(item);

    //convert to JSON String and set to local storage

    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){

    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function createButton(){
    const button = document.createElement('button');
    button.innerHTML = `
              <svg
                id="cross"
                class="ml-auto h-4 w-4 font-bold cursor-pointer hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>`;
    button.className = 'ml-auto h-4 w-4 cursor-pointer hover:text-black';
    
    return button;
}

function createIcon(classes){
        const icon = document.createElement('i');
        i.className = classes;

        return icon;
}
function onclickItem(e){
    if(e.target.parentElement.classList.contains('ml-auto')){
        removeList(e.target.parentElement.parentElement);
    }else{
        setItemtoEdit(e.target);
        
    }
}

function setItemtoEdit(item){
    isEdit = true;

    ul.querySelectorAll('li').forEach(i => i.classList.remove('text-red-400'));

    item.classList.add('text-red-400');
    addButton.textContent = 'Update';
    addButton.style.backgroundColor = '#606676';
    input.value = item.textContent.trim();
    //  const textNode = item.childNodes[0];
    //  console.log(textNode);
    //  textNode.className = 'text-red-400';
    //  textNode.className = 'text-red-400';

    // const span = document.createElement('span');
    // span.className = 'text-red-400'; // Tailwind CSS class for red text color
    // span.textContent = textNode.textContent.trim(); // Move text content to span

    // item.insertBefore(span, textNode);
    // item.removeChild(textNode);
}

function removeList(item){
        // e.preventDefault();
        // if(e.target.parentElement.classList.contains('ml-auto')){

        //     if(confirm('Are you sure?')){

        //         e.target.parentElement.parentElement.remove();

        //         checkUI();
        //     }
        // }

        if(confirm('are you sure?')){

            //remove from DOM
            item.remove();

            //remove item from storage
            console.log(item.textContent);
            removeItemFromStorage(item.textContent.trim());

            checkUI();
        }
}

function  removeItemFromStorage(item){
    console.log(item);
    
    let itemsFromStorage = getItemsFromStorage();

    console.log(itemsFromStorage);

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    
    // itemsFromStorage.forEach(item => console.log(item));
    //re-set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function removeAll(){
    // ul.innerHTML = '';

        if(confirm('Are you sure?')){

            while(ul.firstChild){
                ul.removeChild(ul.firstChild);
            }

            //clear all from local storage

            localStorage.removeItem('items');
            checkUI();
        }
}

function filterItems(e){
        e.preventDefault();
        const items = ul.querySelectorAll('li');
        const text = e.target.value.toLowerCase();


        items.forEach(item =>{
            const itemName = item.firstChild.textContent.toLocaleLowerCase();
            // console.log(itemName);
    
            if(itemName.indexOf(text) != -1){
                item.style.display = 'flex';
            }else{
                item.style.display = 'none';
            }
        });
}

// function editItem(e){
//     const itemName = e.target.textContent;
//     console.log(itemName);
// }

// function addEditItem(item){
//     input.textContent = item;
// }

function checkUI(){
    input.value = '';
    const items = ul.querySelectorAll('li');
    if(items.length === 0){
        clear.style.display = 'none';
        searchDiv.style.display = 'none';
    }else{
        clear.style.display = 'block';
        searchDiv.style.display = 'block';
    }

    isEdit = false;

    addButton.textContent =  'Add Item';
    addButton.className = 'ml-4 items-center rounded-md bg-black px-3 py-2 text-xs font-semibold text-white hover:bg-slate-600';
    addButton.style.backgroundColor = 'black';
//     class="ml-4 items-center rounded-md bg-black px-3 py-2 text-xs font-semibold text-white hover:bg-slate-600"
//   >
//     Add Item
}

function init(){

    // ul.addEventListener('click',removeList);
    ul.addEventListener('click',onclickItem);
    // ul.addEventListener('dblclick',editItem);
    form.addEventListener('submit',onAddItemSubmit);
    clear.addEventListener('click',removeAll);
    search.addEventListener('input',filterItems);
    document.addEventListener('DOMContentLoaded',displayItems);
    checkUI();
}

init();

