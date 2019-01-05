const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('../models/user').model;
const ErrorCodes = require('../config/errorCodes');
const Callbacks = require('../common/callbacks');
const Utils = require('../common/utils');
const Config = require('../config/constants');
const ObjectID = require('mongodb').ObjectID;
const Emailer = require('../common/emailer');

class User {
    constructor() {

    }

    /**
     * POST api/v1/account/signup
     * Create a new employee account.
     */
    signup(req, res, next) {
        req.assert('name', 'name is not required');
        req.assert('email', 'Email is not valid').isEmail();
        req.sanitize('email').normalizeEmail({
            gmail_remove_dots: false
        });

        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                UserModel.findOne({
                    email: req.body.email
                }, (err, existingUser) => {
                    if (err) {
                        return Callbacks.SuccessWithError(err, res);
                    }
                    if (existingUser) {
                        return Callbacks.SuccessWithError('Account with that email address already exists.', res);
                    }
                    const user = new UserModel({
                        email: req.body.email,
                        password: Utils.encryptPassowrd(req.body.password),
                        userType: req.body.type,
                        name: req.body.name
                    });
                    // save the user
                    user.save((err) => {
                        if (err) {
                            return Callbacks.InternalServerError(err, res);
                        }

                        Emailer.sendEmail(
                            user.email, 'ghosesoumya001@gmail.com', 'Successful SignUp: Reset',
                            'Reset Password', `<h1> Click on link below</h1><a href='http://localhost:4200/resetToken/userId'> Reset Pasword</a>`
                        )
                        const response = user.response();
                        return Callbacks.SuccessWithData('User added successfully!', response, res);

                    });
                });

            } else {
                const errors = result.array();
                return Callbacks.ValidationError(errors[0].msg || 'Validation error', res);
            }
        });
    }

    /**
     * POST api/v1/account/signin
     * Signin user: employee/manager.
     */
    signin(req, res, next) {

        req.assert('password', 'Password is required');
        req.sanitize('email').normalizeEmail({
            gmail_remove_dots: false
        });

        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                let email = req.body.email;
                let password = req.body.password;

                UserModel.findOne({
                    email: req.body.email
                }, (err, existingUser) => {
                    if (err || !existingUser) {
                        return Callbacks.SuccessWithError('User not found', res);
                    }
                    if (existingUser) {
                        if (existingUser.password != Utils.decryptPassword(existingUser.password, password)) {
                            return Callbacks.SuccessWithError('Password is invalid', res);
                        } else {
                            return Callbacks.SuccessWithData('Sign In successful', existingUser.response(), res)
                        }
                    }
                });
            } else {
                const errors = result.array();
                return Callbacks.ValidationError(errors[0].msg || 'Validation error', res);
            }
        });
    }

    /**
      * POST api/v1/account/resetPassword
      * Update current password.
      */
    resetPassword(req, res, next) {

        req.assert('password', 'Password is required');
        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                UserModel.findById(req.params.userId, (err, user) => {
                    if (err) {
                        return Callbacks.InternalServerError(err, res);
                    }
                    user.password = req.body.password;
                    user.save((err) => {
                        if (err) {
                            return Callbacks.InternalServerError(err, res);
                        }
                        return Callbacks.Success('Password Reset Successful', res);
                    });
                });
            } else {
                const errors = result.array();
                return Callbacks.ValidationError(errors[0].msg, res);
            }
        }).catch(err => {
            return Callbacks.InternalServerError(err, res);
        });
    };

    /**
     * Get api/v1/account/getUserById/:userId
     * Get user by id.
     */
    getUserById(req, res, next) {
        let userId = req.params.userId;

        if (!Utils.isValidObjectId(userId)) {
            return Callbacks.ValidationError('Invalid id' || 'Validation error', res);
        } else {
            UserModel.findOne({
                _id: new ObjectID(userId)
            }, (err, existingUser) => {
                if (err) {
                    return Callbacks.SuccessWithError(err, res);
                }
                if (existingUser) {
                    let _response = existingUser;
                    return Callbacks.SuccessWithData('User found successfully!', _response, res);
                } else {
                    return Callbacks.SuccessWithError('User not exists.', res);
                }
            });
        }
    }

    /**
     * Get api/v1/account/getUsers
     * Get all Users
     */
    getUsers(req, res, next) {
        UserModel.find({
        }, (err, users) => {
            if (err) {
                return Callbacks.SuccessWithError(err, res);
            }
            if (users && users.length > 0) {
                let _response = users;
                return Callbacks.SuccessWithData('Users found successfully!', _response, res);
            } else {
                return Callbacks.SuccessWithError('Users not exists.', res);
            }
        });
    }
}

const userController = new User();

module.exports = userController;