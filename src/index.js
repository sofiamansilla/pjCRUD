const express = require('express');
const userController = require('./controllers/userController');

const app = express();

app.use(express.static('./src/static'));
app.use(express.json());

userController(app);

app.listen(3000, () => {
   console.log("server iniciado"); 
});

