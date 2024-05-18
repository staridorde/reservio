const { mongoose } = require('mongoose')
const Concert = require('../models/Concert')
const TicketTypes = require('../models/TicketTypes')

const server_url = 'mongodb+srv://starcevicmilos2:t5Am98cmHq5dPkCd@cluster0.wpqt4m9.mongodb.net/reservio?retryWrites=true&w=majority&appName=Cluster0'

exports.initializeDatabase = async () => {
    // mongoose.set('debug', true)
    mongoose.connect(server_url)
        .then(() => console.log('DB Connected'))
        .catch(error => console.log('DB NOT Connected'))

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    await db.dropCollection('concerts')
    await db.dropCollection('reservations')
    await db.dropCollection('ticket_types')
    await db.dropCollection('users')

    const ticketTypes = [{ name: 'VIP' }, { name: 'Regular' }]
    const ticketTypesMap = {}

    for (const ticketType of ticketTypes) {
        const ticketTypeExists = await TicketTypes.Model.findOne({ name: ticketType.name })

        if (ticketTypeExists) {
            console.log(`ticket type ${ticketType.name} exists, move on`)
            ticketTypesMap[ticketType.name] = ticketTypeExists
            continue
        }

        ticketTypesMap[ticketType.name] = new TicketTypes.Model(ticketType)
        await ticketTypesMap[ticketType.name].save()
    }

    const concerts = [
        {
            name: 'Eros Ramazzotti - Battito Infinito World Tour',
            city: 'Belgrade',
            location: 'Beogradska Arena',
            date: new Date('2024-07-20T00:00:00'),
            earlyBirdDate: new Date('2024-06-20T00:00:00'),
            ticketTypes: [
                {
                    ticketTypeId: ticketTypesMap['VIP']._id,
                    capacity: 30,
                    remainingNumberOfTickets: 30,
                    ticketsSold: 0,
                    price: 3000
                },
                {
                    ticketTypeId: ticketTypesMap['Regular']._id,
                    capacity: 120,
                    remainingNumberOfTickets: 120,
                    ticketsSold: 0,
                    price: 1500
                }
            ]
        },
        {
            name: 'Rammstein',
            city: 'Belgrade',
            location: 'Usce',
            date: new Date('2024-07-25T00:00:00'),
            earlyBirdDate: new Date('2024-06-25T00:00:00'),
            ticketTypes: [
                {
                    ticketTypeId: ticketTypesMap['VIP']._id,
                    capacity: 50,
                    remainingNumberOfTickets: 50,
                    ticketsSold: 0,
                    price: 5000
                },
                {
                    ticketTypeId: ticketTypesMap['Regular']._id,
                    capacity: 200,
                    remainingNumberOfTickets: 200,
                    ticketsSold: 0,
                    price: 3500
                }
            ]
        },
        {
            name: 'Pink Floyd',
            city: 'Belgrade',
            location: 'Usce',
            date: new Date('2024-08-20T00:00:00'),
            earlyBirdDate: new Date('2024-07-20T00:00:00'),
            ticketTypes: [
                {
                    ticketTypeId: ticketTypesMap['VIP']._id,
                    capacity: 30,
                    remainingNumberOfTickets: 30,
                    ticketsSold: 0,
                    price: 9000
                },
                {
                    ticketTypeId: ticketTypesMap['Regular']._id,
                    capacity: 70,
                    remainingNumberOfTickets: 70,
                    ticketsSold: 0,
                    price: 6500
                }
            ]
        }
    ]

    for (const concert of concerts) {
        const concertExists = await Concert.Model.findOne({ name: concert.name })

        if (concertExists) {
            console.log(`concert ${concert.name} exists, move on`)
            continue
        }

        new Concert.Model(concert).save()
    }

    // works
    // db.collections.concerts.updateOne(
    //     { _id: concertArr[0]._id, "ticketTypes.ticketTypeId": ticketTypesMap['VIP']._id },
    //     { $inc: { "ticketTypes.$.quantity": -1 } }
    // )

    // works
    // await Concert.Model.updateOne(
    //     { _id: concertArr[0]._id, "ticketTypes.ticketTypeId": ticketTypesMap['VIP']._id },
    //     { $inc: { "ticketTypes.$.quantity": -1 } }
    // )
}