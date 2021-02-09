const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      dropDups: true
    },
    password: {
      type: String,
      required: true
    },
    pin: {
      type: String
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
    },
    type: {
      type: String,
      enum: ['root', 'admin', 'manager', 'viewer'],
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

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
  model: UserModel,
  schema: UserSchema
}
