'use strict';

var availableCountries = require('../models/availableCountries')

module.exports = () => {
    return { success: true, result: availableCountries };
};
