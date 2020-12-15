const Hotel = require('../models/hotel').model

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
