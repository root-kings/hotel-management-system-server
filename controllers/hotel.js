const Hotel = require('../models/hotel').model
const Booking = require('../models/booking').model
const User = require('../models/user').model

// const moment = require('moment-timezone')
const mongoose = require('mongoose')

exports.list_get = (req, res) => {
  let query = {}

  Hotel.find(query)
    .lean()
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.details_get = (req, res) => {
  const { hotelid } = req.params

  let query = {
    _id: hotelid
  }

  Hotel.findOne(query)
    .populate('managers')
    .populate('viewers')
    .lean()
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.create_post = async (req, res) => {
  const { name, owner, rooms, banner } = req.body

  let floors = [
    {
      label: 'Base',
      order: 0,
      rooms: []
    }
  ]

  for (let i = 0; i < rooms; i++) {
    let room = {
      label: i + 1,
      occupied: false,
      available: true
    }
    floors[0].rooms.push(room)
  }

  let newHotel = new Hotel({
    name,
    owner,
    floors,
    banner
  })

  try {
    await newHotel.save()

    return res.send(newHotel)
  } catch (err) {
    console.error({ err })
    return res.status(500).send({ err })
  }
}

exports.update_put = async (req, res) => {
  const { name, owner, rooms, banner } = req.body
  const { hotelid } = req.params

  let hotel = await Hotel.findOne({
    _id: hotelid
  })

  hotel.name = name
  hotel.owner = owner
  hotel.banner = banner

  try {
    await hotel.save()

    return res.send(hotel)
  } catch (err) {
    console.error({ err })
    return res.status(500).send({ err })
  }
}

exports.rooms_update_put = async (req, res) => {
  const { floors } = req.body
  const { hotelid } = req.params

  Hotel.updateOne({ _id: hotelid }, { floors })
    .then(docs => {
      return res.send(docs)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.delete_delete = async (req, res) => {
  const { hotelid } = req.params

  let query = {
    _id: hotelid
  }

  Hotel.deleteOne(query)
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.user_create_post = async (req, res) => {
  const { name, username, password, type, pin } = req.body
  const { hotelid } = req.params

  let newUser = new User({
    name,
    username,
    password,
    type,
    pin,
    hotel: hotelid
  })

  let hotel = await Hotel.findOne({ _id: hotelid })

  hotel[type + 's'].push(newUser)

  await hotel.save()

  newUser
    .save()
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.bookings_put = async (req, res) => {
  let bookings = req.body
  let { hotelid } = req.params

  let newBookings = bookings.filter(b => !b.checkOut)
  let oldBookings = bookings.filter(b => b.checkOut)

  newBookings.forEach(nb => {
    nb.nedbId = nb._id
    delete nb._id
    nb.hotel = hotelid
  })

  await Booking.insertMany(newBookings)

  for (let i = 0; i < oldBookings.length; i++) {
    let bk = await Booking.findOne({ _id: oldBookings[i]._id })
    if (bk) {
      bk.checkOut = oldBookings[i].checkOut
      await bk.save()
    }
  }

  res.send({ success: true })
}

exports.stats_get = (req, res) => {
  let { month, room } = req.query
  let { hotelid } = req.params

  // let NOW = new moment().tz('Asia/Kolkata')

  let query = {
    hotel: mongoose.Types.ObjectId(hotelid)
  }

  if (room) {
    query.room = mongoose.Types.ObjectId(room)
  }

  Booking.aggregate([
    {
      $match: query
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$checkIn' } },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ])
    .then(result => {
      if (month && !isNaN(month))
        result = result.filter(
          item => parseInt(item._id.split('-')[1]) == month
        )

      return res.send(result)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
}
