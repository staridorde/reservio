const express = require('express')
const cors = require('cors')
const { mongoose } = require('mongoose')

const PORT = process.env.PORT || 8001
const server_url = 'mongodb+srv://starcevicmilos2:t5Am98cmHq5dPkCd@cluster0.wpqt4m9.mongodb.net/reservio?retryWrites=true&w=majority&appName=Cluster0'

// database
mongoose.connect(server_url)
    .then(() => console.log('DB Connected'))
    .catch(error => console.log('DB NOT Connected'))

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const Schema = mongoose.Schema

const ticketTypesSchema = new Schema({
    name: String,
    capacity: String,
    price: String
})

const TicketTypesModel = mongoose.model('ticket_types', ticketTypesSchema)

TicketTypesModel.find().then(data => console.log(data))

// server app
const app = express()
app.use(cors())
app.get('/ticketTypes', async (req, res) => {
    const ticketTypes = await TicketTypesModel.find()
    console.log('GET request received on /ticketTypes, returning: ', ticketTypes)
    res.send(ticketTypes)
})

// init server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
