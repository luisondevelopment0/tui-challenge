'use strict';

const axios = require('axios');
const querystring = require('querystring');
const ACCUWEATHER_API = 'http://dataservice.accuweather.com';
const FORECAST_MAX_DAYS = 5;

class WeatherService {

    async search(dates, cityName) {
        let dateToCompare = new Date();
        dateToCompare.setDate(dateToCompare.getDate() + FORECAST_MAX_DAYS);

        if (dateToCompare > dates[1]) // not in forecast range
            return;

        const locationId = await this.getLocationId(cityName)

        const url = `${ACCUWEATHER_API}/forecasts/v1/daily/5day/${locationId}?apikey=${process.env.ACCU_API_KEY}`
        const response = await axios.get(url);

        let forecast = response.data.DailyForecasts.map(x => {
            return {
                date: x.Date,
                temperature: {
                    maximum: x.Temperature.Maximum.Value,
                    minimum: x.Temperature.Minimum.Value,
                    unit: x.Temperature.Maximum.Unit
                },
            }
        })

        return forecast;
    }

    async getLocationId(cityName) {
        const url = `${ACCUWEATHER_API}/locations/v1/cities/search?q=${cityName}&apikey=${process.env.ACCU_API_KEY}`
        const response = await axios.get(url);
        return response.data[0].Key;
    }
};

module.exports = new WeatherService()
