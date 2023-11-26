class UserEntity {
    constructor(
        name,
        age,
        gender,
        id
    ){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.id = Number(id);
    }
}

module.exports = UserEntity;