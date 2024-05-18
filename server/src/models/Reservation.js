const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const reservationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    concertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'concerts',
        required: true
    },
    ticketTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticket_types',
        required: true
    },
    numberOfTickets: { type: Number, required: true },
    token: { type: String, required: true }
})

exports.Model = mongoose.model('reservations', reservationSchema)
