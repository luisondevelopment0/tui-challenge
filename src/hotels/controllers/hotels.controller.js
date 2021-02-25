const router = require('express').Router();
const FindOffers = require('../useCases/FindOffers')

router.get('/', async (req, res) => {

    const { cityCode, ratings, priceRange, currency, limit, offset, }
        = req.query;

    // Apply DRY
    const { success, message, result } = await FindOffers(
        cityCode, ratings, priceRange, currency, limit, offset,
    );

    // Apply DRY
    if (!success) {
        res.status(400).json({ error: [message] });
        return;
    }

    res.status(200).json({ data: result });
})

module.exports = router;