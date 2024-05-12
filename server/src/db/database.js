const { mongoose } = require('mongoose')
const Concert = require('../models/Concert')

const server_url = 'mongodb+srv://starcevicmilos2:t5Am98cmHq5dPkCd@cluster0.wpqt4m9.mongodb.net/reservio?retryWrites=true&w=majority&appName=Cluster0'

exports.initializeDatabase = async () => {
    mongoose.connect(server_url)
        .then(() => console.log('DB Connected'))
        .catch(error => console.log('DB NOT Connected'))

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    const concerts = [
        {
            name: 'Eros Ramazzotti - Battito Infinito World Tour',
            city: 'Belgrade',
            location: 'Beogradska Arena',
            date: '20.06.2024'
        },
        {
            name: 'Rammstein',
            city: 'Belgrade',
            location: 'Usce',
            date: '21.05.2024'
        },
        {
            name: 'Pink Floyd',
            city: 'Belgrade',
            location: 'Usce',
            date: '27.07.2024'
        }
    ]

    for (const concert of concerts) {
        const concertExists = await Concert.Model.findOne({ name: concert.name })

        if (concertExists) {
            console.log('concert exists, move on')
            continue
        }

        new Concert.Model(concert).save()
    }
}