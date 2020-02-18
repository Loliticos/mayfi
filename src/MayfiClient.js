const { Client } = require("discord.js")
const { readdir } = require("fs")
const Loaders = require("./loaders")

module.exports = class MayfiClient extends Client {
	constructor(CLIENT_OPTIONS = {}) {
		super(CLIENT_OPTIONS)

		this.initializeLoaders()
	}

	login (token = process.env.DISCORD_TOKEN) {
    	return super.login(token);
  }

  initializeLoaders () {
    for (let name in Loaders) {
      try {
        let Loader = new Loaders[name](this)
        Loader.load()
      } catch (err) {
        console.error(err)
      }
    }
  }
}