'use strict';

const axios = require('axios');
const querystring = require('querystring');
const ACCUWEATHER_API = 'http://dataservice.accuweather.com';

class WeatherService {

    async search(dates, cityCode) {
        var dateToCompare = new Date();
        dateToCompare.setDate(dateToCompare.getDate() + 10);

        console.log(dates)
        console.log(cityCode)
        console.log(dateToCompare)

        if (dateToCompare > date[1]) // not in forecast range
            return;


        return;


        //TODO: Get location id
        let locationId = 307297

        // TODO: get weather from all dates in dates array
        // right now i'm only using the first one
        let date = dates[0]

        let url = `${ACCUWEATHER_API}/forecasts/v1/daily/10day/${locationId}?apikey=${process.env.ACCU_API_KEY}`
        let response = await axios.get(url);

        let forecast = response.data.DailyForecasts.map(x => {
            return {
                date: x.Date,
                temperature: {
                    Minimum: x.Temperature.Value + x.Temperature.Unit
                },
            }
        })
        offer.fiveDayForecast = forecast
        console.log(offer)

        for (let i = 0; i < hotels.length; i++) {
            let offers = hotels[i].offers

            for (let j = 0; j < offers.length; j++) {
                let offer = offers[j];

            }
        }
    }
};

module.exports = new WeatherService()
