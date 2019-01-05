const crypto = require('crypto');
const config = require('../config/config');
const ObjectID = require('mongodb').ObjectID;
const BASE64_MARKER = ';base64,';
const atob = require('atob');
var mongodb = require("mongodb");
const fs = require('fs');


exports.generateSalt = (password) => {
    var set = '0123456789abcd';
    var salt = '';
    for(var i = 0; i < 10; i++){
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

exports.md5 = (str) => {
    return crypto.createHash('md5').update(str).digest('hex');
}

exports.encryptPassowrd = (password) => {
    var salt = exports.generateSalt();
    var encryptedPassword = (salt + exports.md5(password + salt));
    return encryptedPassword;
}

exports.decryptPassword = (encrypt, password) => {
    var salt = encrypt.substr(0, 10);
    var decryptedPassword = salt + exports.md5(password + salt);
    return decryptedPassword;
}

exports.isValidObjectId = (_id) => {
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if(!_id && _id === '' || _id.match(checkForHexRegExp) == null){
        return false;
    } else {
        return true;
    }
}

exports.isString = (value) => {
    return (typeof value === 'string')
}

exports.isObject = (value) => {
    return (typeof value === 'object')
}

exports.isArray = (value) => {
    return (Object.prototype.toString.call(value) === '[object Array]')
}

