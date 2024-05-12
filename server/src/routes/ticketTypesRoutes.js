const express = require('express')
const router = express.Router()
const ticketTypesController = require('../controllers/ticketTypesController')

router.get('/', ticketTypesController.getTicketTypes)

module.exports = router