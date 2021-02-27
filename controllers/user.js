const User = require('../models/user').model
const Hotel = require('../models/hotel').model

exports.list_get = (req, res) => {
  const { type } = req.query

  let query = {}

  if (type) {
    query.type = type
  }

  User.find(query)
    .select('-password')
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
  const { userid } = req.params

  let query = {
    _id: userid
  }

  User.findOne(query)
    .select('-password')
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
  const { name, username, password, type, pin } = req.body

  let newUser = new User({
    name,
    username,
    password,
    type,
    pin
  })

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

exports.update_put = async (req, res) => {
  const { name, username, password, type, pin } = req.body
  const { userid } = req.params

  const oldUser = await User.findOne({ _id: userid })

  if (type != oldUser.type) {
    if (type == 'viewer') {
      await Hotel.updateOne({
        $pull: {
          managers: userid
        },
        $push: {
          viewers: userid
        }
      })
    }

    if (type == 'manager') {
      await Hotel.updateOne({
        $pull: {
          viewers: userid
        },
        $push: {
          managers: userid
        }
      })
    }
  }

  oldUser.name = name
  oldUser.username = username
  oldUser.password = password
  oldUser.type = type
  oldUser.pin = pin

  oldUser
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
  const { userid } = req.params

  let query = {
    _id: userid
  }

  User.deleteOne(query)
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}
