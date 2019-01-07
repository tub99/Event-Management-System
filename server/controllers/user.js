const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = require('../models/user').model;
const ErrorCodes = require('../config/errorCodes');
const Callbacks = require('../common/callbacks');
const Utils = require('../common/utils');
const Constants = require('../config/constants');
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
        // Validate incoming req data
        req.assert('name', 'name is not required');
        req.assert('email', 'Email is not valid').isEmail();
        req.sanitize('email').normalizeEmail({
            gmail_remove_dots: false
        });

        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                // find whether user with same email already exists
                UserModel.findOne({
                    email: req.body.email
                }, (err, existingUser) => {
                    if (err) {
                        // DB err
                        return Callbacks.InternalServerError(err, res);
                    }
                    if (existingUser) {
                        // user with same email already exists: send err
                        return Callbacks.SuccessWithError('Account with that email address already exists.', res);
                    }
                    // create user and encrypt Password
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
                        // create mail templates
                        const userId = user._id,
                            emailTemplate = `<h3>Hey, ${user.email} please click on the link below to reset your password</h3><a href='${Constants.RESET_PASSWORD_URL}/${userId}'>
                                Reset Pasword</a>`;
                        Emailer.sendEmail(
                            user.email, Constants.FROM_MAIL, Constants.RESET_PASSWORD_SUBJECT,
                            '', emailTemplate
                        ).then(resp => {
                            console.log('Emailer reponse', resp)
                            const response = user.response();
                            //User added successfully
                            return Callbacks.SuccessWithData('User added successfully!', response, res);
                        })
                            .catch(err => {
                                // Couldnt Send mail
                                return Callbacks.Failed(404, 'Couldnt Send mail', res)
                            })


                    });
                });

            } else {
                //Req Validation error
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
        // Validate incoming req data
        req.assert('password', 'Password is required');
        req.sanitize('email').normalizeEmail({
            gmail_remove_dots: false
        });

        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                const email = req.body.email;
                const password = req.body.password;
                // find whether user with same email  exists or not
                UserModel.findOne({
                    email: req.body.email
                }, (err, existingUser) => {
                    if (err || !existingUser) {
                        // user dosen't exist in DB
                        return Callbacks.SuccessWithError('User not found', res);
                    }
                    // If employee decrypt and match, for manager plain checking
                    if (existingUser) {
                        const passwordValidation = existingUser.type === 'employee' ?
                            existingUser.password === Utils.decryptPassword(existingUser.password, password) :
                            existingUser.password === password;

                        if (!passwordValidation) {
                            return Callbacks.SuccessWithError('Password is invalid', res);
                        } else {
                            return Callbacks.SuccessWithData('Sign In successful', existingUser.response(), res)
                        }
                    }
                });
            } else {
                //Validation error
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
        // Validate incoming req data
        req.assert('password', 'Password is required');
        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                UserModel.findById(req.params.userId, (err, user) => {
                    if (err) {
                        return Callbacks.InternalServerError(err, res);
                    }
                    // store updated password in encrypted form
                    user.password = Utils.encryptPassowrd(req.body.password);
                    user.isPassWordReset = true;
                    user.save((err) => {
                        if (err) {
                            return Callbacks.InternalServerError(err, res);
                        }
                        return Callbacks.Success('Password Reset Successful', res);
                    });
                });
            } else {
                //Validation error
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
        const userId = req.params.userId;
        // Validate incoming  data
        if (!Utils.isValidObjectId(userId)) {
            return Callbacks.ValidationError('Invalid id' || 'Validation error', res);
        } else {
            UserModel.findOne({
                _id: new ObjectID(userId)
            }, (err, existingUser) => {
                if (err) {
                    return Callbacks.SuccessWithError(err, res);
                }
                // check if user exists or not
                if (existingUser) {
                    const _response = existingUser;
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
            // if no users found return an empty array
            const userList = users && users.length > 0 ? users : [];
            return Callbacks.SuccessWithData('Events found successfully!', userList, res);
        });
    }
}

const userController = new User();

module.exports = userController;