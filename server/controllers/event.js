const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventModel = require('../models/event').model;
const ErrorCodes = require('../config/errorCodes');
const Callbacks = require('../common/callbacks');
const Utils = require('../common/utils');
const ObjectID = require('mongodb').ObjectID;

class Event {
    constructor() {

    }

    /**
     * Post: api/v1/event/createEvent
     * Create a new event.
     */
    createEvent(req, res, next) {
        req.assert('eventName', 'EventName name missing').notEmpty();
        req.assert('proposedPlaces', 'EventName type missing').notEmpty();

        req.getValidationResult().then(result => {

            if (result.isEmpty()) {
                const event = new EventModel({
                    eventName: req.body.eventName,
                    proposedPlaces: req.body.proposedPlaces,
                });

                EventModel.findOne({
                    eventName: req.body.eventName
                }, (err, existingEvent) => {
                    if (err) {
                        return Callbacks.SuccessWithError(err, res);
                    }
                    if (existingEvent) {
                          const response = existingEvent.response();
                         return Callbacks.SuccessWithData('Event added successfully!', response, res);
                    }

                    // save the event
                    event.save((err) => {
                        console.log('err' , err);
                        if (err) {
                            return Callbacks.InternalServerError(err, res);
                        }
                        let response = event.response();
                        return Callbacks.SuccessWithData('Event added successfully!', response, res);
                    });
                });
            } else {
                const errors = result.array();
                return Callbacks.ValidationError(errors[0].msg || 'Validation error', res);
            }
        });
    }
    
    /**
     * PUT: api/v1/proposePlace/:eventId
     * Update Event.
     */
    proposePlace(req, res, next) {
        req.assert('place', 'EventName type missing').notEmpty();
        req.assert('eventId', 'EventName id missing').notEmpty();

        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                
                const eventId = req.body.eventId;

                if(!Utils.isValidObjectId(eventId)){
                    return Callbacks.ValidationError('Invalid id' || 'Validation error', res);
                } else {
                    EventModel.findOne({
                        _id: new ObjectID(eventId)
                    }, (err, existinEvent) => {
                        if (err) {
                            return Callbacks.SuccessWithError(err, res);
                        }
                        if (existinEvent) {
    
                            const eventUpdate = { 
                                $set : {
                                    eventName: existinEvent.eventName,
                                    orgName: existinEvent.proposedPlaces.push(req.body.push),
                                    finalized: existinEvent.finalized
                                }
                            };
    
                            // save the event
                            EventModel.update({_id: new ObjectID(eventId)}, eventUpdate, function(err, result) {
                                console.log('err' , err);
                                if (err) {
                                    return Callbacks.InternalServerError(err, res);
                                }
                                let _response = 'Event : propose place updated successfully!';
                                return Callbacks.Success(_response, res);
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
	PUT: api/v1/event/finalize/:eventId

     */
    finalizeEvent(req, res, next) {

        req.assert('eventId', 'EventId id missing').notEmpty();

        req.getValidationResult().then(result => {
            if (result.isEmpty()) {
                
                const eventId = req.body.eventId;

                if(!Utils.isValidObjectId(eventId)){
                    return Callbacks.ValidationError('Invalid id' || 'Validation error', res);
                } else {
                    EventModel.findOne({
                        _id: new ObjectID(eventId)
                    }, (err, existinEvent) => {
                        if (err) {
                            return Callbacks.SuccessWithError(err, res);
                        }
                        if (existinEvent) {
    
                            const eventUpdate = { 
                                $set : {
                                    eventName: existinEvent.eventName,
                                    orgName: existinEvent.proposedPlaces,
                                    finalized: true
                                }
                            };
    
                            // save the event
                            EventModel.update({_id: new ObjectID(eventId)}, eventUpdate, function(err, result) {
                                console.log('err' , err);
                                if (err) {
                                    return Callbacks.InternalServerError(err, res);
                                }
                                let _response = 'Event : Place Finalized updated successfully!';
                                return Callbacks.Success(_response, res);
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
     * Get api/v1/event/getEventById/:eventId
     * Get event by id.
     */
    getEventById(req, res, next) {
        let eventId = req.params.eventId;

        if(!Utils.isValidObjectId(eventId)){
            return Callbacks.ValidationError('Invalid id' || 'Validation error', res);
        } else {
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
            if (events && events.length > 0) {
                return Callbacks.SuccessWithData('Events found successfully!', events, res);
            } else {
                return Callbacks.SuccessWithError('Event does not exists.', res);
            }
        });
    }
}

const eventCtrl = new Event();

module.exports = eventCtrl;