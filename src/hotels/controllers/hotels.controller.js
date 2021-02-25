const router = require('express').Router();
const FindOffers = require('../useCases/FindOffers')

router.get('/', async (req, res) => {

    const { cityCode, ratings, priceRange, currency, limit, offset, }
        = req.query;

    const { success, message, result } = await FindOffers(
        cityCode, ratings, priceRange, currency, limit, offset,
    );

    if (!success) {
        res.status(400).json({ error: [message] });
        return;
    }

    res.status(200).json({ data: result });
})

module.exports = router;