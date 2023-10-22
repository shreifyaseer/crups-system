// select all elemant 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let descount = document.getElementById('descount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

let mood = 'Create';

// متغير وهمي
let tmp;
// select all elemant

// start get total function 
function getTotla() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +descount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(2, 2, 142)'
    }
}
// start get total function

// save data to localStorage

let arrayProduct = [];
// chek to localStorage is not empty

if (localStorage.product != null) {
    arrayProduct = JSON.parse(localStorage.product);
}

create.onclick = _ => {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value,
    }
    if (mood == "Create") {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++){
                arrayProduct.push(newProduct);
        }
    } else {
        arrayProduct.push(newProduct);
    } 
    } else {
        arrayProduct[tmp] = newProduct
        create.innerHTML = 'Create';
        count.style.display = 'block';
    }
    localStorage.setItem('product', JSON.stringify(arrayProduct));
    
    clearData();
    addData()
}

// save data to localStorage

// clear data for inputs 
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    descount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// clear data for inputs 

// add data to table 
function addData() {
    let table = '';
    for (let i = 0; i < arrayProduct.length; i++) {
        table += `
            <tr>
                <th>${i}</th>
                <th>${arrayProduct[i].title}</th>
                <th>${arrayProduct[i].price}</th>
                <th>${arrayProduct[i].taxes}</th>
                <th>${arrayProduct[i].ads}</th>
                <th>${arrayProduct[i].descount}</th>
                <th>${arrayProduct[i].total}</th>
                <th>${arrayProduct[i].category}</th>
                <th><button id="update" onclick="updateData(${i})">updata</button></th>
                <th><button id="delete" onclick="deleteItem(${i})">delete</button></th>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.querySelector('.deleteAll');
    if (arrayProduct.length > 0) {
        deleteAll.innerHTML = `
        <button id="deleteDataAll" onclick="deleteAllData()">deleteAll(${arrayProduct.length})</button>
        `
    } else {
        deleteAll.innerHTML = "";
    }
    getTotla()
}
addData();
// add data to table

// delete itme 
function deleteItem(i) {
    arrayProduct.splice(i, 1);
    localStorage.product = JSON.stringify(arrayProduct);
    addData()
}
// delete itme

// deleteData all 
function deleteAllData() {
    arrayProduct.splice(0);
    localStorage.clear()
    addData();
}
// deleteData all 


// update data 
function updateData(i) {
    title.value = arrayProduct[i].title;
    price.value = arrayProduct[i].price;
    taxes.value = arrayProduct[i].taxes;
    ads.value = arrayProduct[i].ads;
    descount.value = arrayProduct[i].descount;
    category.value = arrayProduct[i].category;
    getTotla();
    create.innerHTML = "Update";
    count.style.display = "none"
    mood = 'Update'
    tmp = i;
}
// update data

// seerch form id 
let searchMood = 'title';

function getSearchMood(id) {
    let btnSearch = document.getElementById('search');
    if (id == "secrchtitle") {
        searchMood = 'title'
    } else {
        searchMood = 'category';
    }
    btnSearch.placeholder = 'Search By' + " " + searchMood;
    btnSearch.focus()
}


function setSeacrchMood(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < arrayProduct.length; i++){
            if (arrayProduct[i].title.includes(value)) {
                table += `
            <tr>
                <th>${i}</th>
                <th>${arrayProduct[i].title}</th>
                <th>${arrayProduct[i].price}</th>
                <th>${arrayProduct[i].taxes}</th>
                <th>${arrayProduct[i].ads}</th>
                <th>${arrayProduct[i].descount}</th>
                <th>${arrayProduct[i].total}</th>
                <th>${arrayProduct[i].category}</th>
                <th><button id="update" onclick="updateData(${i})">updata</button></th>
                <th><button id="delete" onclick="deleteItem(${i})">delete</button></th>
            </tr>
                `
            }
        }
    } else {
        for (let i = 0; i < arrayProduct.length; i++){
            if (arrayProduct[i].category.includes(value)) {
                table += `
            <tr>
                <th>${i}</th>
                <th>${arrayProduct[i].title}</th>
                <th>${arrayProduct[i].price}</th>
                <th>${arrayProduct[i].taxes}</th>
                <th>${arrayProduct[i].ads}</th>
                <th>${arrayProduct[i].descount}</th>
                <th>${arrayProduct[i].total}</th>
                <th>${arrayProduct[i].category}</th>
                <th><button id="update" onclick="updateData(${i})">updata</button></th>
                <th><button id="delete" onclick="deleteItem(${i})">delete</button></th>
            </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// seerch form id 