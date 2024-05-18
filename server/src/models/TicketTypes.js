const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const ticketTypesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: String,
    price: String
})

exports.Model = mongoose.model('ticket_types', ticketTypesSchema)
