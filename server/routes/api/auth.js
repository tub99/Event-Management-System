const Callbacks = require('./../../common/callbacks');
const ErrorCodes = require('./../../config/errorCodes');
const Router = require('express').Router;
const routes = Router();

let checkAuth = (req, res, next) =>{
    console.log('API hit /auth ');
    let pass = req.body.password;
    if( pass === process.env.AUTH_PASSWORD){
        return Callbacks.Success({auth: true}, res);
    } else {
        return Callbacks.Success({auth: false}, res);
    }
}

routes.post('/auth', checkAuth );

module.exports = routes;