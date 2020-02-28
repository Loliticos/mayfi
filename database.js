const { connect, Schema, model} = require('mongoose')

const transformProps = require('transform-props')
const castToString = arg => String(arg)

connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log('[DB] => Ocorreu um erro na conexão.')
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
	level: { type: Number, default: 0 },
	exp: { type: Number, default: 0 },
	levelIsActive: { type: Boolean, default: false }
})

const GuildSchema = new Schema({
	_id: String,
	prefix: { type: String, default: "m!" },
	language: { type: String, default: "pt-BR" },
	logsChannel: { type: String, default: "false" },
	levelUpMessage: { type: String, default: "Gg {user}, you leved up to level {level}" }
})

parse = (entity) => {
   return entity ? transformProps(entity.toObject({ versionKey: false }), castToString, '_id') : null
}

UserSchema.methods.findOne = (id, projection) => {
  return this.model.findById(id, projection).then(parse)
}

module.exports.users = model('users', UserSchema)
module.exports.guilds = model('guilds', GuildSchema)