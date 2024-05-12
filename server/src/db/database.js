const { mongoose } = require('mongoose')
const Concert = require('../models/Concert')

const server_url = 'mongodb+srv://starcevicmilos2:t5Am98cmHq5dPkCd@cluster0.wpqt4m9.mongodb.net/reservio?retryWrites=true&w=majority&appName=Cluster0'

exports.initializeDatabase = async () => {
    mongoose.connect(server_url)
        .then(() => console.log('DB Connected'))
        .catch(error => console.log('DB NOT Connected'))

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    const concert = {
        name: 'Eros Ramazzotti - Battito Infinito World Tour',
        city: 'Belgrade',
        location: 'Beogradska Arena',
        date: '20.06.2024'
    }

    const concertExists = await Concert.Model.findOne({ name: concert.name })

    if (concertExists) {
        return
    }

    new Concert.Model(concert).save()
}