const { Client } = require("discord.js")
const { readdir } = require("fs")
const path = require('path');
const dirPath = path.join(__dirname, '/listeners');

module.exports = class MayfiClient extends Client {
	constructor(CLIENT_OPTIONS = {}) {
		super(CLIENT_OPTIONS)

		this.initializeListeners()
	}

	login (token = process.env.DISCORD_TOKEN) {
    	return super.login(token);
  }

  initializeListeners(path = dirPath) {
    console.log(__dirname)
    readdir(path, (err, files) => {
      if(err) return console.log(err)

        files.forEach(evt => {
          const event = new (require(path)(this))
          super.on(evt.split(".")[0], (...args) => event.run(...args))
        })
    })
  }
}