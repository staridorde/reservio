const Concert = require('../models/Concert')

exports.getConcerts = async () => {
  return await Concert.Model.find()
}
