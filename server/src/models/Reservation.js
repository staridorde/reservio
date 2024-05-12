const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const reservationSchema = new Schema({
    firstName: String,
    lastName: String,
    company: String,
    address1: String,
    address2: String,
    postalCode: String,
    city: String,
    country: String,
    email: String,
    confirmEmail: String,
    ticketType: String
})

exports.Model = mongoose.model('reservations', reservationSchema)
