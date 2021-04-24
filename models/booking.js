const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema

const BookingSchema = new Schema(
  {
    // rent: {
    //   type: Number,
    // },
    checkOut: {
      type: Date
    },
    checkIn: {
      type: Date,
      required: true
    },
    room: {
      type: Schema.Types.ObjectId,
      required: true
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    nedbId: {
      type: String
    }

    // guest: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Guest',
    //   required: true
    // }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObjects: {
      virtuals: true
    }
  }
)

BookingSchema.plugin(mongoosePaginate)

const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = {
  model: BookingModel,
  schema: BookingSchema
}
