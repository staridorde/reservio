const express = require('express')
const router = express.Router()
const concertController = require('../controllers/concertController')

router.get('/', concertController.getConcerts)

module.exports = router
