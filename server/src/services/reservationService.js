const { mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const Reservation = require('../models/Reservation')
const Concert = require('../models/Concert')

const secretKey = 'my-secret-key'

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
          token: 1,
          __v: 1,
          'userDetails.firstName': 1,
          'userDetails.lastName': 1,
          'concertDetails.name': 1,
          'concertDetails.date': 1,
          'concertDetails.earlyBirdDate': 1,
          'ticketTypeDetails.name': 1,
        },
      }
    ])

    return reservations
  } catch (error) {
    throw error
  }
}

exports.getConcertReservationsWithToken = async token => {
  try {
    const decoded = jwt.verify(token, secretKey)
    const reservation = await Reservation.Model.findById(new mongoose.Types.ObjectId(decoded.reservationId))
    return reservation
  } catch (error) {
    throw error
  }
}

exports.updateReservation = async ({reservationId, updates}) => {
  try {
    // probably should change concert ticket sold values
    const reservation = await Reservation.Model.findByIdAndUpdate(reservationId, updates, { new: true })
    return reservation
  } catch (error) {
    throw error
  }
}

exports.createReservation = async data => {
  try {
    const concert = await Concert.Model.findById(data.concertId)

    if (!concert) {
      throw new Error('Concert not found')
    }

    const expirationTime = Math.floor(new Date(concert.date).getTime() / 1000)
    const expiresIn = expirationTime - Math.floor(Date.now() / 1000)

    const reservation = await Reservation.Model.create(data)
    const token = jwt.sign(
      { concertId: data.concertId, userId: data.userId, reservationId: reservation._id },
      secretKey,
      { expiresIn: expiresIn }
    )

    const concertId = new mongoose.Types.ObjectId(data.concertId)
    const ticketTypeId = new mongoose.Types.ObjectId(data.ticketTypeId)
    await Concert.Model.updateOne(
      { _id: concertId, "ticketTypes.ticketTypeId": ticketTypeId },
      { $inc: {
        "ticketTypes.$.remainingNumberOfTickets": -parseInt(data.numberOfTickets),
        "ticketTypes.$.ticketsSold": parseInt(data.numberOfTickets)
      }}
    )

    return { token }
  } catch (error) {
    throw error
  }
}
