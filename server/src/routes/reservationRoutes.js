const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationController')

router.get('/', reservationController.getConcertReservations)
router.get('/withToken', reservationController.getConcertReservationsWithToken)
router.post('/', reservationController.createReservation)
router.put('/', reservationController.updateReservation)

module.exports = router
