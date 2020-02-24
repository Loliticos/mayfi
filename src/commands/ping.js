let Command = require("../..")

module.exports = class Ping extends Command {
	constructor() {
		super({
			name: "ping",
			aliases: ["pong"]
		})
	}
}