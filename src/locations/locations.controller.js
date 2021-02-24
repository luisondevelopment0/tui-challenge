var router = require('express').Router();
var axios = require('axios');
var querystring = require('querystring');
var availableCountries = require('./availableCountries')

router.get('/countries', (_, res) => { 
    res.json(availableCountries);
})

router.get('/cities', async (req, res) => {
    let countryCode = req.query.countryCode;
    let keyword = req.query.keyword;
    let limit = req.query.limit;
    let offset = req.query.offset;

    let found = availableCountries.find(x => x.code === countryCode)

    if (!found)
        res.status(400).json({ error: { message: `country ${countryCode} is not available` } });

    if (keyword.length < 2)
        res.status(400).json({ error: { message: `keyword ${countryCode} must have at least 3 characters` } });

    let auth = await getToken()
    console.log(auth.data.access_token)

    let url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${keyword}&countryCode=${countryCode}&page%5Blimit%5D=${limit}&page%5Boffset%5D=${offset}&sort=analytics.travelers.score`
    let response = await axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + auth.data.access_token
        }
    });

    let { data } = response.data;

    let cities = data.map(c => { return { name: c.name, id: c.id, iataCode: c.iataCode } })

    res.json({ data: cities })
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