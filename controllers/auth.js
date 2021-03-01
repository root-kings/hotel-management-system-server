const jwt = require('jsonwebtoken')

const User = require('../models/user').model
const Booking = require('../models/booking').model

exports.login_post = async (req, res) => {
  const { username, password } = req.body

  User.findOne({ username, password })
    .lean()
    .then(async user => {
      if (user) {
        // Create a token
        const payload = { user }
        const options = {
          expiresIn: process.env.JWT_EXPIRES,
          issuer: process.env.JWT_ISSUER
        }
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(payload, secret, options)

        let bookings = await Booking.find({
          hotel: user.hotel
          // checkOut: {
          //   $exists: false
          // }
        })

        return res.send({
          status: true,
          token,
          user,
          bookings
        })
      } else {
        return res.send({
          status: false
        })
      }
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send({ err })
    })
}

exports.login_status_get = (req, res) => {
  res.send({ success: true })
}
