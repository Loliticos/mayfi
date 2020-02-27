const { Schema, model } = require('mongoose')

const BlacklistedSchema = new Schema({
  reason: { type: String, required: true },
  blacklister: { type: String, required: true }
})

const UserSchema = new Schema({
  _id: String,
  money: Number,
  lastDaily: Number,
  globalXp: Number,
  personalText: String,
  blacklisted: BlacklistedSchema,
  favColor: String,
  rep: Number,
  lastRep: Number,
  lastDBLBonusClaim: Number
})

module.exports = model('User', UserSchema)