const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FloorSchema = new Schema(
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
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
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

const FloorModel = mongoose.model('Floor', FloorSchema)

module.exports = {
  model: FloorModel,
  schema: FloorSchema
}
