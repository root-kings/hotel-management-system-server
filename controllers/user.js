const User = require('../models/user').model

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

exports.update_put = (req, res) => {
  const { name, username, password, type, pin } = req.body
  const { userid } = req.params

  User.updateOne(
    {
      _id: userid
    },
    {
      name,
      username,
      password,
      type,
      pin
    }
  )
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
