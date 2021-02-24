var router = require('express').Router();
var axios = require('axios');
const querystring = require('querystring');

router.get('/', async (req, res) => {
    let queryObj = {
        cityCode: req.query.cityCode,
        ratings: req.query.ratings,
        limit: req.query.limit,
        offset: req.query.offset,
        priceRange: req.query.priceRange,
        currency: req.query.currency,
    }

    if (queryObj.rating > 5)
        res.status(400).json({ error: { message: `ratings ${queryObj.ratings} can't be bigger than 5` } });

    var queryStr = querystring.encode(queryObj);

    // cache token so it can be used on another requests without requesting it again
    let auth = await getToken()

    let url = `https://test.api.amadeus.com/v2/shopping/hotel-offers?${queryStr}`

    let response = await axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + auth.data.access_token
        }
    });

    let { data } = response.data;

    let hotels = data.map(h => {
        return {
            hotel: {
                hotelId: h.hotel.hotelId,
                name: h.hotel.name,
                rating: h.hotel.rating,
                description: h.hotel.description,
                media: h.hotel.media,
            },
            offers: h.offers
        }
    })

    let locationId = 307297

    for (let i = 0; i < hotels.length; i++) {
        let offers = hotels[i].offers

        for (let j = 0; j < offers.length; j++) {
            let offer = offers[j];
            let url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationId}?apikey=${process.env.ACCU_API_KEY}`
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
        }
    }

    res.json({ data: hotels })
})


async function getToken() {
    let url = 'https://test.api.amadeus.com/v1/security/oauth2/token'

    let form = querystring.stringify({
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
        grant_type: 'client_credentials'
    })

    return await axios.post(url, form, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

module.exports = router;