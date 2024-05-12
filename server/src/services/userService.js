const User = require('../models/User')

exports.createUser = async data => {
  try {
    const userExists = await User.Model.findOne({email: data.email})

    if (userExists) {
      return userExists
    }

    const createUser = new User.Model(data)
    await createUser.save()
    return createUser
  } catch (error) {
    return error
  }
}
