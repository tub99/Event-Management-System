const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationName: { type: String, default: ''},
    address: { type: String, default: ''}
}),
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    proposedPlaces: [locationSchema],
    finalized: { type: Boolean, default: 'false' },
}, { timestamps: true });

eventSchema.methods.response = function response() {
    return {
        eventId: this._id,
        eventName : this.eventName,
        proposedPlaces: [locationSchema],
        finalized : this.finalized
    };
}

const Event = mongoose.model('Event', eventSchema);

module.exports = {
    model: Event,
    schema: eventSchema
};