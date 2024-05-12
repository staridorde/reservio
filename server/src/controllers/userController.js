const userService = require('../services/userService')

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
