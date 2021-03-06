const { connect, Schema, model} = require('mongoose')

const transformProps = require('transform-props')
const castToString = arg => String(arg)

connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log('[DB] => There was an error while initializing database.', err)
  console.log('[DB] Connection estabilished with success!')
})

const UserSchema = new Schema({
	_id: String,
	money: { type: Number, default: 0 },
	personalText: { type: String, default: "Use m!personaltext to change this message" },
	blacklisted: { type: Boolean, default: false },
	reps: { type: Number, default: 0 },
	lastRep: { type: Number, default: 0 },
	gems: { type: Number, default: 0 },
	lastMine: { type: Number, default: 0 },
	researchesPoints: { type: Number, default: 0 },
	fragments: { type: Number, default: 0 },
	warns: { type: Number, default: 0 },
	married: { type: String, default: "false" },
	ring: { type: Boolean, default: false }
})

const GuildSchema = new Schema({
	_id: String,
	prefix: { type: String, default: "m!" },
	language: { type: String, default: "en-US" },
	logsChannel: { type: String, default: "false" },
	moderationChannel: { type: String, default: "false" },
	noPermissions: { type: Boolean, default: false }
})

parse = (entity) => {
   return entity ? transformProps(entity.toObject({ versionKey: false }), castToString, '_id') : null
}

UserSchema.methods.findOne = (id, projection) => {
  return this.model.findById(id, projection).then(parse)
}

module.exports.users = model('users', UserSchema)
module.exports.guilds = model('guilds', GuildSchema)