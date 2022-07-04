const Router = require('express').Router();
const userController = require('../controller/userController');




Router.post('/register-user', userController.register);
Router.get('/refresh_token', userController.refreshToken);




module.exports = Router;