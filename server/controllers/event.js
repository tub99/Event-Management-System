const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventModel = require('../models/event').model;
const ErrorCodes = require('../config/errorCodes');
const Callbacks = require('../common/callbacks');
const Utils = require('../common/utils');
const ObjectID = require('mongodb').ObjectID;
const Emailer = require('../common/emailer');
const Constants = require('../config/constants');

class Event {
    constructor() {

    }

    /**
     * Post: api/v1/event/createEvent
     * Create a new event.
     */
    createEvent(req, res, next) {
        req.assert('eventName', 'EventName name missing').notEmpty();
        req.assert('proposedPlaces', 'EventName type missing');
        // validation incoming request data
        req.getValidationResult().then(result => {

            if (result.isEmpty()) {
                const event = new EventModel({
                    eventName: req.body.eventName,
                    proposedPlaces: req.body.proposedPlaces,
                });
                // check if event with same name exisits
                EventModel.findOne({
                    eventName: req.body.eventName
                }, (err, existingEvent) => {
                    if (err) {
                        // Db error
                        return Callbacks.SuccessWithError(err, res);
                    }
                    // if exists send an error status:0 with message
                    if (existingEvent) {
                        const response = existingEvent.response();
                        return Callbacks.SuccessWithError('Event exists with same name', response, res);
                    }

                    // save the event
                    event.save((err) => {
                        console.log('err', err);
                        if (err) {
                            // Db error while saving
                            return Callbacks.InternalServerError(err, res);
                        }
                        const response = event.response();
                        return Callbacks.SuccessWithData('Event added successfully!', response, res);
                    });
                });
            } else {
                // Express request validation error 
                const errors = result.array();
                return Callbacks.ValidationError(errors[0].msg || 'Validation error', res);
            }
        });
    }

    /**
     * PUT: api/v1/event/proposePlace?event=eventId&user=userId
     * Update Event --> propose place.
     */
    proposePlace(req, res, next) {
        // employee proposes a place
        req.assert('place', 'Place is missing').notEmpty();
        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                const eventId = req.query.eventId;
                const place = req.body.place;
                // Validate req data
                if (!eventId || !Utils.isValidObjectId(eventId) || !place) {
                    return Callbacks.ValidationError('Invalid id or place' || 'Validation error', res);
                } else {
                    // check for exisiting and update
                    EventModel.findOne({
                        _id: new ObjectID(eventId)
                    }, (err, existinEvent) => {
                        if (err) {
                            return Callbacks.SuccessWithError(err, res);
                        }
                        if (existinEvent) {
                            // if event is already finalized return err message
                            if (existinEvent.isFinalized) {
                                return Callbacks.SuccessWithError('Event already finalized', res);
                            }
                            // update proposed places array
                            existinEvent.proposedPlaces.push(req.body.place);
                            const eventUpdate = {
                                $set: {
                                    eventName: existinEvent.eventName,
                                    proposedPlaces: existinEvent.proposedPlaces,
                                    isFinalized: existinEvent.isFinalized
                                }
                            };

                            // update the event
                            EventModel.update({ _id: new ObjectID(eventId) }, eventUpdate, function (err, result) {
                                console.log('err', err);
                                if (err) {
                                    return Callbacks.InternalServerError(err, res);
                                }
                                // mail template 
                                const emailtemplate = `<h1>Hi ${Constants.MANAGER_EMAIL}, a new place , 
                                ${place.locationName} has been added to the Event, ${existinEvent.eventName}.
                                </h1><a href='${Constants.APP_REDIRECT_URL}'>Click Here to Goto App</a>`;
                                // sending mail via emailer utility function
                                Emailer.sendEmail(
                                    Constants.MANAGER_EMAIL, Constants.FROM_MAIL, Constants.EVENT_PLACE_ADDITION_SUBJECT,
                                    '', emailtemplate
                                ).then(resp => {
                                    console.log('Emailer reponse', resp)
                                    const response = 'Event : propose place updated successfully!';
                                    return Callbacks.Success(response, res);
                                })
                                    .catch(err => {
                                        return Callbacks.Failed(404, 'Couldnt Send mail', res)
                                    })

                            });
                        } else {
                            return Callbacks.SuccessWithError('Event does not exist.', res);
                        }
                    });
                }
            } else {
                const errors = result.array();
                return Callbacks.ValidationError(errors[0].msg || 'Validation error', res);
            }
        });
    }

    /**
     * 
	PUT: api/v1/event/finalize?eventId=eventId&locId=locId

     */
    finalizeEvent(req, res, next) {
        // finalizing a place require eventId and the locId to be finalized
        req.assert('eventId', 'EventId id missing').notEmpty();
        req.assert('locId', 'finalizedLocation Id is missing').notEmpty();

        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                const finalizedLocationId = req.query.locId;
                const eventId = req.query.eventId;
                // Validate req data
                if (!eventId || !Utils.isValidObjectId(eventId) || !Utils.isValidObjectId(finalizedLocationId)) {
                    return Callbacks.ValidationError('Invalid id' || 'Validation error || location not finalized', res);
                } else {
                    // check for exisiting and update
                    EventModel.findOne({
                        _id: new ObjectID(eventId)
                    }, (err, existinEvent) => {
                        if (err) {
                            return Callbacks.SuccessWithError(err, res);
                        }
                        if (existinEvent) {
                            // finalize event via isFinalized=true
                            const eventUpdate = {
                                $set: {
                                    eventName: existinEvent.eventName,
                                    proposedPlaces: existinEvent.proposedPlaces,
                                    finalizedLocationId: finalizedLocationId,
                                    isFinalized: true
                                }
                            };

                            // update the event
                            EventModel.update({ _id: new ObjectID(eventId) }, eventUpdate, function (err, result) {
                                console.log('err', err);
                                if (err) {
                                    // DB error
                                    return Callbacks.InternalServerError(err, res);
                                }
                                // Finalize success
                                const response = 'Event : Place Finalized updated successfully!';
                                return Callbacks.Success(response, res);
                            });
                        } else {
                            // Event Not existing
                            return Callbacks.SuccessWithError('Event does not exist.', res);
                        }
                    });
                }
            } else {
                //Validation error
                const errors = result.array();
                return Callbacks.ValidationError(errors[0].msg || 'Validation error', res);
            }
        });
    }




    /**
     * Get api/v1/event/getEventById/:eventId
     * Get event by id.
     */
    getEventById(req, res, next) {
        const eventId = req.params.eventId;
        // Validation check
        if (!Utils.isValidObjectId(eventId)) {
            return Callbacks.ValidationError('Invalid id' || 'Validation error', res);
        } else {
            // checking for the particular event via findOne
            EventModel.findOne({
                _id: new ObjectID(eventId)
            }, (err, existingEvent) => {
                if (err) {
                    return Callbacks.SuccessWithError(err, res);
                }
                if (existingEvent) {
                    const response = existingEvent;
                    return Callbacks.SuccessWithData('Event found successfully!', response, res);
                } else {
                    return Callbacks.SuccessWithError('Event not exists.', res);
                }
            });
        }
    }

    /**
     * Get api/v1/event/getEvents
     * Get all events
     */
    getEvents(req, res, next) {
        EventModel.find({
        }, (err, events) => {
            if (err) {
                return Callbacks.SuccessWithError(err, res);
            }
            // if no events found return an empty array
            const eventList = events && events.length > 0 ? events : [];
            return Callbacks.SuccessWithData('Events found successfully!', eventList, res);
        });
    }
}

const eventCtrl = new Event();

module.exports = eventCtrl;