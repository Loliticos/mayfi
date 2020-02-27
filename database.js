const { connect, Schema, model} = require('mongoose')

connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.log('[DATABASE] => Ocorreu um erro na conexão.')
  console.log('[DATABASE] => Me conectei com sucesso!')
})

const User = new Schema({
	_id: String,
	money: { type: Number, default: 0 },
	personalText: { type: String, default: "Use m!personaltext to change this message" },
	blacklisted: { type: Boolean, default: false },
	reps: { type: Number, default: 0 },
	lastRep: { type: Number, default: 0 }
})

const Guild = new Schema({
	_id: String,
	prefix: { type: String, default: "mc!" },
	language: { type: String, default: "pt-BR" },
	logsChannel: { type: String, default: "false" }
})


var UsersDB = model('User', User);
var GuildsDB = model('Guild', Guild);

module.exports.User = model('User', User)
module.exports.Guild = model('Guild', Guild)