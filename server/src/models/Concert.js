const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

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
        type: Array,
        required: true
    },
    additionalInfo: {
        type: String,
        required: false
    }
})

exports.Model = mongoose.model('concerts', concertSchema)
