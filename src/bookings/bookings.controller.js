var router = require('express').Router();
var axios = require('axios');
const querystring = require('querystring');

const BookingScheme = require('./booking.scheme')

router.post('', async (req, res) => {

    console.log(req.body)
    const booking = new BookingScheme({
        userId: req.body.userId,
        offerId: req.body.offerId
    });

    console.log(booking)

    let saveBooking = await booking.save()

    res.json(saveBooking)
})

module.exports = router;