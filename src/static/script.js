const server = "http://localhost:3000";

const getUserRow = (user) => {
    const tr = document.createElement("tr");
    let td;
    let button;
    
    td = document.createElement("td");
    td.appendChild(document.createTextNode(user.name));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(user.age));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(user.gender));
    tr.appendChild(td);

    td = document.createElement("td");
    button = document.createElement("button");
    button.appendChild(document.createTextNode("Editar"));
    button.addEventListener("click", (event) => {
        document.querySelector('#label-edit').textContent = `Editando Usuario: ${user.name}`;
        document.querySelector('#btnGuardar').setAttribute('data-userId', user.id);
        document.querySelector('#name').value = user.name;
        document.querySelector('#age').value = user.age;
        document.querySelector('#gender').value = user.gender;
    });

    td.appendChild(button);
    tr.appendChild(td);

    td = document.createElement("td");
    button = document.createElement("button");
    button.appendChild(document.createTextNode("Eliminar"));
    button.addEventListener("click", (event) => {
        delUser(user.id);
    });
    
    td.appendChild(button);
    tr.appendChild(td);

    return tr;
}

const getUsers = () => {
    const endpoint = `${server}/users`;

    const processResponse = (resp) => {
        return resp.json();
    };

    const listUsers = (userList) => {
        const userListTable = document.querySelector(".user_list");
        let tbodyUserList = userListTable.querySelector("tbody");
        
        userListTable.removeChild(tbodyUserList);
        tbodyUserList = document.createElement("tbody");
        userListTable.appendChild(tbodyUserList);
        
        userList.forEach((user) => {
            const userRow = getUserRow(user);
            tbodyUserList.appendChild(userRow);
        });
    }
    
    return fetch(endpoint)
    .then(processResponse)
    .then(listUsers)
}

const delUser = (userId) => {
    const endpoint = `${server}/users/${userId}`;

    const processResponse = (resp) => {
        return resp.json();
    };

    return fetch(endpoint, {
        method: 'DELETE'
    })
    .then(processResponse)
    .then((resp) => {
        getUsers();
    })
};

const saveUser = (user) => {
    const endpoint = `${server}/users/${user.userId}`;
    return fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => {
        getUsers();
    });
};

document.querySelector('#btnGuardar').addEventListener('click', (event) => {
    const userId =  event.target.getAttribute('data-userId');

    const userName = document.querySelector('#name').value;
    const userAge = document.querySelector('#age').value;
    const userGender = document.querySelector('#gender').value;

    const cleanForm = () => {
        document.querySelector('#label-edit').textContent = `Nuevo Usuario`;
        event.target.removeAttribute('data-userId');
        document.querySelector('#name').value = '';
        document.querySelector('#age').value = '';
        document.querySelector('#gender').value = '';
    };

    saveUser({
        userName,
        userAge,
        userGender,
        userId
    }).then(cleanForm);
});

getUsers();