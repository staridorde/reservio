const reservationService = require('../services/reservationService')

exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationService.createReservation(req.body)
    res.status(200).json(reservation)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
