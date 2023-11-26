const db = require('../db');

class UserService {

    constructor(){

    }

    getUsers(){
        return db.users;
    }

    getUserById(id){
        return db.users.find((user) => {
            return user.id == id;
        });
    }

    delUser(id){
        for(var i = 0; i<db.users.length; i++){
            if (db.users[i].id == id) {
                db.users.splice(i,1);
            }
        }  
    }

    saveUser(user){
        if (user.id) {
            //edita
            const userEdit = this.getUserById(user.id);
            userEdit.name = user.name;
            userEdit.age = user.age;
            userEdit.gender = user.gender;
        } else {
            //crea
            let id = 0;
            db.users.forEach((user) => {
                if (user.id > id) {
                    id = user.id;
                }
            });

            user.id = ++id;
            db.users.push(user);
        }
    }
}

module.exports = UserService;