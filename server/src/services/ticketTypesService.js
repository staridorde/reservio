const TicketTypes = require('../models/TicketTypes')

exports.getTicketTypes = async () => {
  return await TicketTypes.Model.find()
}
