const User = require('../models/user').model

exports.checkUsernameAvailability = (req, res) => {
  const { username } = req.query

  User.findOne({ username })
    .then(doc => {
      if (doc) return res.send(false)
      else return res.send(true)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.checkPhoneAvailability = (req, res) => {
  const { phone } = req.query

  User.findOne({ phone })
    .then(doc => {
      if (doc) return res.send(false)
      else return res.send(true)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}
