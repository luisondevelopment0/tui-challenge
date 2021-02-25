const router = require('express').Router();

const GetAvailableCountries = require('../useCases/GetAvailableCountries')
const GetCities = require('../useCases/GetCities')

router.get('/countries', (_, res) => {
    const { success, message, result } = GetAvailableCountries()

    if (!success) {
        res.status(400).json({ error: [message] });
        return;
    }

    res.status(200).json({ data: result });
})

router.get('/cities', async (req, res) => {
    const { keyword, limit, offset, countryCode } = req.query;

    const { success, message, result } = await GetCities(keyword, countryCode, limit, offset)

    if (!success) {
        res.status(400).json({ error: [message] });
        return;
    }

    res.status(200).json({ data: result });
})

module.exports = router;