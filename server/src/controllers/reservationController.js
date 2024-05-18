const reservationService = require('../services/reservationService')

exports.getConcertReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getConcertReservations(req.query)
    res.status(200).json(reservations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.getConcertReservationsWithToken = async (req, res) => {
  try {
    const reservations = await reservationService.getConcertReservationsWithToken(req.query.token)
    res.status(200).json(reservations)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await reservationService.updateReservation(req.body)
    res.status(200).json(reservation)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationService.createReservation(req.body)
    res.status(200).json(reservation)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
