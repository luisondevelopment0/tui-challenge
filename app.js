require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(process.env.MONGO_URL)

mongoose
    .connect(`${process.env.MONGO_URL}`, {
        useNewUrlParser: true
    })
    .then(_ => {
        console.log('MongoDB Conectado');
    })
    .catch(error => {
        console.log('MongoDB Error');
        console.log(error);
    });

const LocationsController = require('./src/locations/controllers/locations.controller')
const HotelsController = require('./src/hotels/controllers/hotels.controller')
const BookingsController = require('./src/bookings/controllers/bookings.controller')

app.use('/locations', LocationsController)
app.use('/hotels', HotelsController)
app.use('/bookings', BookingsController)

app.listen(process.env.PORT || '3000');