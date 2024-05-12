const Reservation = require('../models/Reservation')

exports.createReservation = async data => {
  try {
    const newReservation = new Reservation.Model(data)
    await newReservation.save()
    return newReservation
  } catch (error) {
    return error
  }
}
