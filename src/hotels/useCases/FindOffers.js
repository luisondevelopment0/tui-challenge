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
                media: h.hotel.media,
                cityName: h.hotel.address.cityName
            },
            offers: h.offers
        }
    })

    let weather = {};

    // try/catch block due to accuweather api quota
    try {
        // get all check in dates from offers
        const checkInDates = hotels.flatMap(x => x.offers.map(y => new Date(y.checkInDate)))
        // get the closest date
        const date = new Date(Math.min.apply(null, checkInDates));
        // get the city name from the first hotel because they are all from the same city
        const cityName = hotels[0].hotel.cityName

        weather = await WeatherService.search(date, cityName)
    }
    catch (err) {
        console.log(err)
    }

    return { success: true, result: { hotels, weather } };
};
