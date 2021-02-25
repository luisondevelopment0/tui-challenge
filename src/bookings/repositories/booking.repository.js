'use strict';

const Booking = require('../models/Booking');
const MongooseBooking = require('./booking.scheme');

class BookingRepository {

    async save(booking) {
        const { userId, offerId } = booking;
        const mongooseBooking = new MongooseBooking({ userId, offerId });
        await mongooseBooking.save();
        return new Booking(mongooseBooking.id, mongooseBooking.userId, mongooseBooking.offerId);
    }

    async exists(userId, offerId) {
        let result = await MongooseBooking.findOne({ userId, offerId });
        return result != null;
    }

    async filter(userId, offerId, limit, offset) {
        let query = MongooseBooking.find();

        if (userId)
            query = query.where('userId').eq(userId);
        if (offerId)
            query = query.where('offerId').eq(offerId);
        if (limit)
            query = query.limit(parseInt(limit));
        if (offset)
            query = query.skip(parseInt(offset));

        return await query.exec();
    }
};

module.exports = new BookingRepository()
