const { mongoose } = require('mongoose')
const Reservation = require('../models/Reservation')
const Concert = require('../models/Concert')

exports.getConcertReservations = async reservationData => {
  try {
    // this is and example of join request
    const reservations = await Reservation.Model.aggregate([
      { $match: { concertId: new mongoose.Types.ObjectId(reservationData.concertId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $lookup: {
          from: 'concerts',
          localField: 'concertId',
          foreignField: '_id',
          as: 'concertDetails',
        },
      },
      {
        $lookup: {
          from: 'ticket_types',
          localField: 'ticketTypeId',
          foreignField: '_id',
          as: 'ticketTypeDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $unwind: '$concertDetails',
      },
      {
        $unwind: '$ticketTypeDetails',
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          concertId: 1,
          ticketTypeId: 1,
          numberOfTickets: 1,
          __v: 1,
          'userDetails.firstName': 1,
          'userDetails.lastName': 1,
          'concertDetails.name': 1,
          'concertDetails.date': 1,
          'ticketTypeDetails.name': 1,
        },
      }
    ])

    return reservations
  } catch (error) {
    throw error
  }
}

exports.createReservation = async data => {
  try {
    const reservation = await Reservation.Model.create([data])

    const concertId = new mongoose.Types.ObjectId(data.concertId)
    const ticketTypeId = new mongoose.Types.ObjectId(data.ticketTypeId)
    await Concert.Model.updateOne(
      { _id: concertId, "ticketTypes.ticketTypeId": ticketTypeId },
      { $inc: {
        "ticketTypes.$.remainingNumberOfTickets": -parseInt(data.numberOfTickets),
        "ticketTypes.$.ticketsSold": parseInt(data.numberOfTickets)
      }}
    )
    // const concert = await Concert.Model.findOneAndUpdate(
    //   { _id: concertId, "ticketTypes.ticketTypeId": ticketTypeId },
    //   { $inc: { "ticketTypes.$.quantity": -parseInt(data.quantity) } }
    // )

    return reservation[0]
  } catch (error) {
    throw error
  }
}
