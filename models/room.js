const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoomSchema = new Schema(
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
    },
    floor: {
      type: Schema.Types.ObjectId,
      ref: 'Floor',
      required: true
    }
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

const RoomModel = mongoose.model('Room', RoomSchema)

module.exports = {
  model: RoomModel,
  schema: RoomSchema
}
