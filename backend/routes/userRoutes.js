const Router = require('express').Router();
const userController = require('../controller/userController');




Router.post('/register-user', userController.register);
Router.post('/login', userController.login);
Router.post('/logout', userController.logout);
Router.get('/refresh_token', userController.refreshToken);




module.exports = Router;