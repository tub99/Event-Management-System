const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationName: { type: String, default: '' },
    address: { type: String, default: '' },
    proposedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    proposedPlaces: [locationSchema],
    finalizedLocationId: { type: Schema.Types.ObjectId},
    isFinalized: { type: Boolean, default: 'false' },
}, { timestamps: true });

eventSchema.methods.response = function response() {
    return {
        eventId: this._id,
        eventName: this.eventName,
        proposedPlaces: this.proposedPlaces,
        isFinalized: this.isFinalized,
        finalizedLocationId: this.finalizedLocation
    };
}

const Event = mongoose.model('Event', eventSchema);

module.exports = {
    model: Event,
    schema: eventSchema
};