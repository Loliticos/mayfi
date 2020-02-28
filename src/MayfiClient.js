const { Client } = require("discord.js")
const { readdir } = require("fs")
const Loaders = require('./loaders/')

module.exports = class MayfiClient extends Client {
	constructor(CLIENT_OPTIONS = {}) {
		super(CLIENT_OPTIONS)

		this.initializeLoaders()
    this.database = require("../database.js")
	}

	login (token = process.env.DISCORD_TOKEN) {
    	return super.login(token)
  }

  async runCommand (command, context, args, language) {
    context.setFixedT(this.i18next.getFixedT(language))
    return command._run(context, args).catch(console.error)
  }
  
  logError (...args) {
    const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : []
    console.error('[ErrorLog]', ...tags, args[args.length - 1])
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