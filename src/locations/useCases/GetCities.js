'use strict';

const availableCountries = require('../models/availableCountries')
const HotelsService = require('../../hotels/services/hotels.service')

module.exports = async (keyword, countryCode, limit, offset) => {
    let found = availableCountries.find(x => x.code === countryCode)

    console.log(countryCode)

    if (!found)
        return { success: false, message: `country ${countryCode} is not available` };
    if (keyword.length < 2)
        return { success: false, message: `keyword ${countryCode} must have at least 3 characters` };

    const response = await HotelsService.getCities(keyword, countryCode, limit, offset)

    let { data } = response.data;

    let cities = data.map(c => { return { name: c.name, id: c.id, iataCode: c.iataCode } })

    return { success: true, result: cities };
};
