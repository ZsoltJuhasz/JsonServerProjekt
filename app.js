const addButton = document.querySelector("#addButton");
const getButton = document.querySelector("#getButton");
const modifyButton = document.querySelector('#modifyButton');
const getAllButton = document.querySelector('#getAllButton');
const delButton = document.querySelector('#delButton');

const idElem = document.querySelector('#id');
const fullnameElem = document.querySelector('#fullname');
const cityElem = document.querySelector('#city');
const salaryElem = document.querySelector('#salary');

const list = document.querySelector('#list');

addButton.addEventListener('click', event => {
    addEmployee();
    alert('Hozzáadás vége');
})

getButton.addEventListener('click', event => {
    getEmployee();
})

modifyButton.addEventListener('click', event => {
    modifyEmployee();
})

getAllButton.addEventListener('click', event => {
    getAllEmployee();
})

delButton.addEventListener('click', event => {
    delEmployee();
})


function addEmployee() {
    var url = 'http://localhost:9000/employees';
    fetch(url, {
            method: "post",
            body: JSON.stringify({
                //id: idElem.value,
                fullname: fullnameElem.value,
                city: cityElem.value,
                salary: salaryElem.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
}

function getEmployee() {
    var id = idElem.value;
    var url = 'http://localhost:9000/employees/' + id;

    fetch(url, {
            method: "get",
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            var employee = JSON.parse(data);
            fullnameElem.value = employee.fullname;
            cityElem.value = employee.city;
            salaryElem.value = employee.salary;
        })
        .catch(error => console.log(error))
}

function modifyEmployee() {
    var id = idElem.value;
    var url = 'http://localhost:9000/employees/' + id;
    fetch(url, {
            method: "put",
            body: JSON.stringify({
                //id: idElem.value,
                fullname: fullnameElem.value,
                city: cityElem.value,
                salary: salaryElem.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
}

function getAllEmployee() {
    var url = 'http://localhost:9000/employees';

    fetch(url, {
            method: "get",
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            let employees = JSON.parse(data);
            list.innerHTML = '';
            employees.forEach(employee => {
                let deleteButon = document.createElement('button');
                deleteButon.innerHTML = 'Törlés';
                deleteButon.setAttribute('data-id', employee.id);
                let li = document.createElement('li');
                li.innerHTML = employee.id + ") ";
                li.innerHTML += employee.fullname;
                list.appendChild(li);
                li.appendChild(deleteButon);
                addEventToButtons(deleteButon, li);
            })
        })
        .catch(error => console.log(error))
}

function delEmployee(id) {
    var url = 'http://localhost:9000/employees/' + id;
    fetch(url, {
            method: "delete",
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
}

function addEventToButtons(button, li){
    button.addEventListener('click', event =>{
        console.log("Törlésre ítélve " + event.target.dataset.id);
        delEmployee(event.target.dataset.id);
        li.parentNode.removeChild(li);
    });
}