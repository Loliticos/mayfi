const { connect, Schema, model} = require('mongoose')

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
	lastRep: { type: Number, default: 0 }
})

const GuildSchema = new Schema({
	_id: String,
	prefix: { type: String, default: "mc!" },
	language: { type: String, default: "pt-BR" },
	logsChannel: { type: String, default: "false" }
})

module.exports.Users = model('Users', UserSchema)
module.exports.Guilds = model('Guilds', GuildSchema)