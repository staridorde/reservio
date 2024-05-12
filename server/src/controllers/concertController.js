const concertService = require('../services/concertService')

exports.getConcerts = async (req, res) => {
  try {
    const concerts = await concertService.getConcerts()
    res.json(concerts)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
