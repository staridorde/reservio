const User = require('../models/User')

exports.createUser = async data => {
  try {
    const createUser = new User.Model(data)
    await createUser.save()
    return createUser
  } catch (error) {
    return error
  }
}
