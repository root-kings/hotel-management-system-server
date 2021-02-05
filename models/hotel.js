const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    managers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    viewers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],

    banner: {
      type: String
    },

    floors: [
      {
        label: {
          type: String,
          required: true
        },
        order: {
          type: Number,
          default: 0,
          required: true
        },
        rooms: [
          {
            label: {
              type: String,
              required: true
            },
            occupied: {
              type: Boolean,
              default: false,
              required: true
            },
            available: {
              type: Boolean,
              default: true,
              required: true
            }
          }
        ]
      }
    ]
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

const HotelModel = mongoose.model('Hotel', HotelSchema)

module.exports = {
  model: HotelModel,
  schema: HotelSchema
}
