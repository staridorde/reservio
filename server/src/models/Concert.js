const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const availableTicketTypeSchema = new mongoose.Schema({
    ticketTypeId: mongoose.Schema.Types.ObjectId,
    capacity: Number,
    remainingNumberOfTickets: Number,
    ticketsSold: Number,
    price: Number,
})

const concertSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    ticketTypes: {
        type: [availableTicketTypeSchema],
        required: true
    },
    additionalInfo: {
        type: String,
        required: false
    }
})

exports.Model = mongoose.model('concerts', concertSchema)
