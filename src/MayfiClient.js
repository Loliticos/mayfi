const { Client } = require("discord.js")
const { readdir } = require("fs")
const Loaders = require('./loaders/')
const fs = require('fs')

module.exports = class MayfiClient extends Client {
	constructor(CLIENT_OPTIONS = {}) {
		super(CLIENT_OPTIONS)

    this.databaseLoaded = null

    await this.initializeDatabase()
    await this.initializeLoaders()
    this.checkMute(this)

    this.database = this.databaseLoaded
    this.mutes = require("../mute.json")

	}

	login (token = process.env.DISCORD_TOKEN) {
    	return super.login(token)
  }

  runCommand (command, context, args, language) {
    context.setFixedT(this.i18next.getFixedT(language))
    return command._run(context, args).catch(console.error)
  }

  initializeDatabase () {
    try {
      this.databaseLoaded = require("../database.js")
    } catch (e) {
      this.databaseLoaded = null
      console.error(e)
    }
  }

  async checkMute (client) {
    this.setInterval(async () => {
      for (let i in client.mutes) {
        const guild = client.guilds.get(client.mutes[i].guild)

        if (!guild) return

        const time = client.mutes[i].time
        const member = guild.members.get(i)

        const mutedRole = guild.roles.find(r => r.name === "Silenciado" || r.name === "Muted")

        if (!member.roles.has(mutedRole.id)) member.addRole(mutedRole.id)

        if (Date.now() > time) {
          member.removeRole(mutedRole.id)
          delete this.mutes[i]

          console.log(`User ${member.user.tag} has been unmuted`)

          await fs.writeFile("../mute.json", JSON.stringify(client.mutes), err => {
            if (err) console.error
          })

        }
      }
    }, 5000)
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