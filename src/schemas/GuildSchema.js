const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  _id: String,
  prefix: String,
  language: String,
  logChannel: String
})

module.exports = model('User', UserSchema)