'use strict';

const HotelsService = require('../services/hotels.service')
const WeatherService = require('../services/weather.service')

module.exports = async (cityCode, ratings, priceRange, currency, limit, offset) => {
    if (ratings > 5)
        return { success: false, message: `ratings ${ratings} can't be bigger than 5` }
    if (ratings < 1)
        return { success: false, message: `ratings ${ratings} can't be less than 1` }

    const response = await HotelsService.search(cityCode, ratings, priceRange, currency, limit, offset);

    const { data } = response.data;

    if (!data) return { success: true, result: null };

    let hotels = data.map(h => {
        return {
            hotel: {
                hotelId: h.hotel.hotelId,
                name: h.hotel.name,
                rating: h.hotel.rating,
                description: h.hotel.description,
                media: h.hotel.media
            },
            offers: h.offers
        }
    })

    // get all check in dates from offers
    const checkInDates = hotels.flatMap(x => x.offers.map(y => new Date(y.checkInDate)))
    // get the closest date
    let date = new Date(Math.min.apply(null, checkInDates));

    // due to accuweather api quota
    try {
        let weather = WeatherService.search(date, cityCode)
    }
    catch (err) {
        console.log(err)
    }

    return { success: true, result: hotels };
};
