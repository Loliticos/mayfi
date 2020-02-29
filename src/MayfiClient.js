const { Client } = require("discord.js")
const { readdir } = require("fs")
const Loaders = require('./loaders/')

module.exports = class MayfiClient extends Client {
	constructor(CLIENT_OPTIONS = {}) {
		super(CLIENT_OPTIONS)

    this.databaseLoaded = null

    this.initializeLoaders()
    this.initializeDatabase()

    this.database = this.databaseLoaded
	}

	login (token = process.env.DISCORD_TOKEN) {
    	return super.login(token)
  }

  async runCommand (command, context, args, language) {
    context.setFixedT(this.i18next.getFixedT(language))
    return command._run(context, args).catch(console.error)
  }

  async initializeDatabase () {
    try {
      this.databaseLoaded = require("../database.js")
    } catch (e) {
      this.databaseLoaded = null
      console.error(e)
    }
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