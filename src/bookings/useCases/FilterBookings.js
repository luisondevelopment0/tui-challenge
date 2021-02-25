'use strict';

const Booking = require('../models/Booking');
const BookingRepository = require('../repositories/booking.repository')

module.exports = async (userId, offerId, limit, offset) => {

    let bookings = await BookingRepository.filter(userId, offerId, limit, offset);

    return { success: true, result: bookings };
};
