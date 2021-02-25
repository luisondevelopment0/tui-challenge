const router = require('express').Router();
const BookOffer = require('../useCases/BookOffer')
const FilterBookings = require('../useCases/FilterBookings')

router.post('', async (req, res) => {

    let { userId, offerId } = req.body

    const { success, message, result } = await BookOffer(userId, offerId)

    if (!success) {
        res.status(400).json({ error: [message] });
        return;
    }

    res.status(201).json({ data: result });
})

router.get('', async (req, res) => {
    let { userId, offerId, limit, offset } = req.query

    const { result } = await FilterBookings(userId, offerId, limit, offset)

    res.status(200).json({ data: result });
})

module.exports = router;