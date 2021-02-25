const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingScheme = new Schema({
    userId: {
        type: String,
        require: true
    },
    offerId: {
        type: String,
        require: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('bookings', bookingScheme);