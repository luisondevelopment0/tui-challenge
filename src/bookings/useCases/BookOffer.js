'use strict';

const Booking = require('../models/Booking');
const BookingRepository = require('../repositories/booking.repository')

module.exports = async (userId, offerId) => {

    let exists = await BookingRepository.exists(userId, offerId);

    if (exists) {
        return { success: false, message: `offerId ${offerId} already taken` };
    }

    let booking = new Booking(null, userId, offerId)

    booking = await BookingRepository.save(booking);

    return { success: true, result: booking };
};
