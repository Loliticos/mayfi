const { Client } = require("discord.js")
const { readdir } = require("fs")

module.exports = class MayfiClient extends Client {
	constructor(CLIENT_OPTIONS = {}) {
		super(CLIENT_OPTIONS)

		this.initializeListeners()
	}

	login (token = process.env.DISCORD_TOKEN) {
    	return super.login(token);
  }

  initializeListeners(path = "./src/listeners") {
    readdir(path, (err, files) => {
      if(err) return console.log(err)

        files.forEach(evt => {
          const event = new (require(path)(this))
          super.on(evt.split(".")[0], (...args) => event.run(...args))
        })
    })
  }
}