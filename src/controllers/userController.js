const UserService = require('../services/userService');
const UserEntity = require('../entity/userEntity');

const userController = (app) => {

    app.get('/users', (req, res) => {

        const userService = new UserService();
        const users = userService.getUsers();

        res.json(users).status(200);
    });

    app.get('/users/:id', (req, res) => {

        const userService = new UserService();
        const userId = req.params.id;

        const user = userService.getUserById(userId);
    
        if (user == null) {
            res.json({
                "message": `user by id ${userId} could not found`
            }).status(204);
        }

        res.json(user).status(200);
    });

    app.delete('/users/:id', (req, res) => {

        const userService = new UserService();
        const userId = req.params.id;

        userService.delUser(userId);

        res.json({
            message: `user by id ${userId} was deleted`
        }).status(200);
    });

    app.post('/users/:id', (req, res) => {

        const userService = new UserService();
        const payload = req.body;

        const user = new UserEntity(
            payload.userName, 
            payload.userAge,
            payload.userGender,
            payload.userId
        );

        userService.saveUser(user);

        res.json({
            message: 'user was saved'
        }).status(200);
    });
};

module.exports = userController;