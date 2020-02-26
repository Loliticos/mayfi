const { Client } = require("discord.js")
const { readdir } = require("fs")
const Loaders = require('./loaders')

module.exports = class MayfiClient extends Client {
	constructor(CLIENT_OPTIONS = {}) {
		super(CLIENT_OPTIONS)

		this.initializeLoaders()
	}

	login (token = process.env.DISCORD_TOKEN) {
    	return super.login(token)
  }

  async initializeLoaders () {
    for (let Loader in Loaders) {
      let loader = new Loaders[Loader](this)
      try {
        await loader.load()
      } catch (err) {
        console.log(`There was an error while initializing the Loaders\n${err}`)
      }
    }
  }
}