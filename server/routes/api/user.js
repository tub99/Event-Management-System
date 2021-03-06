const Router = require('express').Router;
const routes = Router();
const userCtrl = require('../../controllers/user');

routes.post('/signup', userCtrl.signup );
routes.post('/signin', userCtrl.signin );
routes.put('/resetPassword/:userId', userCtrl.resetPassword);
routes.get('/getUserById/:userId', userCtrl.getUserById);
routes.get('/getUsers', userCtrl.getUsers);
module.exports = routes;