'use strict';

const axios = require('axios');
const querystring = require('querystring');

// TODO: Put on .env file
const AMADEUS_API = 'https://test.api.amadeus.com';

class HotelsService {

    async search(cityCode, ratings, priceRange, currency, limit, offset) {
        const queryStr = querystring.encode({ cityCode, ratings, limit, offset, priceRange, currency });
        // cache token so it can be used on another requests without requesting it again
        let auth = await this.getToken();

        let url = `${AMADEUS_API}/v2/shopping/hotel-offers?${queryStr}`

        let response = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + auth.data.access_token
            }
        });

        return response;
    }

    async getToken() {
        let url = `${AMADEUS_API}/v1/security/oauth2/token`

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
};

module.exports = new HotelsService()
