const performDatabaseUpdate = require('./performDatabaseUpdate')

const Booking = require('../models/booking').model
const Stat = require('../models/stat').model

const carryOver = async () => {
  let openBookings = await Booking.find({
    checkOut: {
      $exists: false
    }
  })

  openBookings.forEach(booking => {
    delete booking._id
  })

  await Stat.insertMany(openBookings)

  console.log(openBookings)
}

const main = async () => {
  await performDatabaseUpdate(carryOver)
}

main()
