localStorage.clear();
localStorage.setItem("usersList", JSON.stringify([]))


function showData(id) {
    //document.querySelector('#ul-data').innerHTML = "";
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }

    let html = "";
    usersList.forEach((user, index) => {
        console.log('user', user)
        if(user){
            html += `<li>${user[Object.keys(user)[0]].data[0]} ${user[Object.keys(user)[0]].data[1]}<button onclick="deleteData('${user[Object.keys(user)[0]].data[1]}')">Eliminar</button><button onclick = "editData('${user[Object.keys(user)[0]].data[1]}')">Editar</button></li>`
        }
    });
    document.querySelector('#' + id).innerHTML = html;
}

//document.onload = showData()

function addData(event) {
    // event.prevenDefaul();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;

    if (name === "" || email === "") return;

    let usersList;
    if (localStorage.getItem("userList")) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }

    let newUserList = []
    usersList.forEach((user, index) => {
        if(user){
            newUserList.push(user)
        }
    });

    usersList = newUserList

    console.log('usersList1', usersList)
    let correoObjeto = {}
    correoObjeto[email] = { 'email': email, data: [name, email] }
    console.log('correoObjeto', correoObjeto)
    usersList.push(correoObjeto)
    console.log('usersList2', usersList)
    localStorage.setItem("usersList", JSON.stringify(usersList))
    showData('ul-data')

    document.querySelector('#name').value = ""
    document.querySelector('#email').value = ""
}

function deleteData(email) {
    let usersList;
    if (localStorage.getItem("userList")) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }

    let Index
    usersList.forEach((user, index) => {
        if(user){
            console.log('chek',user[Object.keys(user)[0]],email)
            if (user[Object.keys(user)[0]].email == email) {
                Index = index
             }
        }
    });

    delete usersList[Index]
    
    let newUserList = []
    usersList.forEach((user, index) => {
        if(user){
            newUserList.push(user)
        }
    });

    usersList = newUserList

    localStorage.setItem("usersList", JSON.stringify(usersList))
    usersList = JSON.parse(localStorage.getItem("usersList"))
    console.log('usersList', usersList) 

    showData('ul-data')
}
function editData(email) {

    //showData()
    let html = `
    <label>Nombre</label>
    <input type="text" id="nameEdit" placeholder="Ingresar un Nombre">
    <label>Correo</label>
    <input type="text" id="emailEdit" placeholder="Ingresar un Correo">
    <div>
        <button onclick="editData2('${email}')">Editar</button>
    </div>`
    document.querySelector('#edit-user').innerHTML = html;
}
function editData2(email) {
    let name2 = document.querySelector('#nameEdit').value
    let email2 = document.querySelector('#emailEdit').value
    deleteData(email)

    let usersList;
    if (localStorage.getItem("userList")) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }

    let user = {}
    user[email2] = { 'email': email2, data: [name2, email2] }
    usersList.push(user)
    localStorage.setItem("usersList", JSON.stringify(usersList))

    usersList = JSON.parse(localStorage.getItem("usersList"))
    console.log('test_user', usersList)
    
    document.querySelector('#edit-user').innerHTML = "";
    showData('ul-data')
}
