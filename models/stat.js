const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema

const StatSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: true
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
  },
  {
    toJSON: {
      virtuals: true
    },
    toObjects: {
      virtuals: true
    },
    timestamps: true
  }
)

StatSchema.plugin(mongoosePaginate)

const StatModel = mongoose.model('Stat', StatSchema)

module.exports = {
  model: StatModel,
  schema: StatSchema
}
