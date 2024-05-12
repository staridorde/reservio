const ticketTypesService = require('../services/ticketTypesService')

exports.getTicketTypes = async (req, res) => {
  try {
    const ticketTypes = await ticketTypesService.getTicketTypes()
    res.json(ticketTypes)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
