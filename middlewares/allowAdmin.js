const User = require('../models/user').model

const allowAdmin = async (req, res, next) => {
  const { _id } = req.decoded.user

  const user = await User.findOne({ _id })

  if (user.type === 'admin') {
    next()
  } else {
    let result = {
      error: `Authentication error. Access forbidden.`,
      status: 403
    }
    res.status(403).send(result)
  }
}

module.exports = allowAdmin
