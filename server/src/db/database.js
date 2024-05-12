const { mongoose } = require('mongoose')
const Concert = require('../models/Concert')
const TicketTypes = require('../models/TicketTypes')

const server_url = 'mongodb+srv://starcevicmilos2:t5Am98cmHq5dPkCd@cluster0.wpqt4m9.mongodb.net/reservio?retryWrites=true&w=majority&appName=Cluster0'

exports.initializeDatabase = async () => {
    mongoose.connect(server_url)
        .then(() => console.log('DB Connected'))
        .catch(error => console.log('DB NOT Connected'))

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    const vipTicketType = new TicketTypes.Model({ name: 'VIP' })
    const regularTicketType = new TicketTypes.Model({ name: 'Regular' })

    await vipTicketType.save()
    await regularTicketType.save()

    const concerts = [
        {
            name: 'Eros Ramazzotti - Battito Infinito World Tour',
            city: 'Belgrade',
            location: 'Beogradska Arena',
            date: '20.06.2024',
            ticketTypes: [
                {
                    ticketTypeId: vipTicketType._id,
                    quantity: 30,
                    price: 3000
                },
                {
                    ticketTypeId: regularTicketType._id,
                    quantity: 120,
                    price: 1500
                }
            ]
        },
        {
            name: 'Rammstein',
            city: 'Belgrade',
            location: 'Usce',
            date: '21.05.2024',
            ticketTypes: [
                {
                    ticketTypeId: vipTicketType._id,
                    quantity: 50,
                    price: 5000
                },
                {
                    ticketTypeId: regularTicketType._id,
                    quantity: 2000,
                    price: 3500
                }
            ]
        },
        {
            name: 'Pink Floyd',
            city: 'Belgrade',
            location: 'Usce',
            date: '27.07.2024',
            ticketTypes: [
                {
                    ticketTypeId: vipTicketType._id,
                    quantity: 30,
                    price: 9000
                },
                {
                    ticketTypeId: regularTicketType._id,
                    quantity: 70,
                    price: 6500
                }
            ]
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