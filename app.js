require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log('aqui')
console.log(process.env.MONGO_URL)

mongoose
    .connect(`mongodb://${process.env.MONGO_URL}:27017/tui-challenge`, {
        useNewUrlParser: true
    })
    .then(result => {
        console.log('MongoDB Conectado');
    })
    .catch(error => {
        console.log('MongoDB Error');
        console.log(error);
    });

const LocationsController = require('./src/locations/locations.controller')
const HotelsController = require('./src/hotels/hotels.controller')
const BookingsController = require('./src/bookings/bookings.controller')

app.use('/locations', LocationsController)
app.use('/hotels', HotelsController)
app.use('/bookings', BookingsController)

app.listen(process.env.PORT || '3000');