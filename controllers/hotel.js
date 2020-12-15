const Hotel = require('../models/hotel').model
const Room = require('../models/room').model
const Floor = require('../models/floor').model
const User = require('../models/user').model

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

exports.create_post = (req, res) => {
  const { name, owner } = req.body

  let newHotel = new Hotel({
    name,
    owner
  })

  newHotel
    .save()
    .then(doc => {
      return res.send(doc)
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

exports.create_room_post = (req, res) => {
  const { label, floor } = req.body

  let newRoom = new Room({
    label,
    floor
  })

  newRoom
    .save()
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.create_floor_post = (req, res) => {
  const { label, order } = req.body
  const { hotelid: hotel } = req.params

  let newFloor = new Floor({
    label,
    order,
    hotel
  })

  newFloor
    .save()
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.list_rooms_get = async (req, res) => {
  const { hotelid: hotel } = req.params

  try {
    const floors = await Floor.find({ hotel })

    const rooms = await Room.find({
      floor: {
        $in: floors
      }
    })
      .populate('floor')
      .lean()

    return res.send(rooms)
  } catch (err) {
    console.error({ err })
    return res.status(500).send({ err })
  }
}

exports.list_floors_get = async (req, res) => {
  const { hotelid: hotel } = req.params

  try {
    const floors = await Floor.find({ hotel }).lean()

    return res.send(floors)
  } catch (err) {
    console.error({ err })
    return res.status(500).send({ err })
  }
}

exports.create_user_post = async (req, res) => {
  const { name, phone, password, type, pin } = req.body
  const { hotelid: _id } = req.params

  let newUser = new User({
    name,
    phone,
    password,
    type,
    pin
  })

  let updateQuery = {
    $push: {
      [type + 's']: newUser
    }
  }

  try {
    await newUser.save()
    await Hotel.updateOne({ _id }, updateQuery)

    return res.send({ success: true })
  } catch (err) {
    console.error({ err })
    return res.status(500).send({ err })
  }
}
