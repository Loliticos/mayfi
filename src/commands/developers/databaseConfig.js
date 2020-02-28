/* eslint-disable no-eval */

const { Command } = require('../../')

module.exports = class DatabaseConfig extends Command {
  constructor (client) {
    super({
      name: 'databaseconfig',
      aliases: ['dc'],
      category: 'developers',
      hidden: true,
      requirements: { onlyDevs: true }
    }, client)
  }

  async run ({ channel, message, guild, author, t }) {
    try {
      channel.send("Estou tentando deletar as guilds!")
      this.client.guilds.forEach(g => {
          await this.client.database.guilds.deleteOne({_id: g.id}).then(() => {
            const newGuild = new this.client.database.guilds({
              _id: g.id
            })

            newGuild.save()
          })
      })

      channel.send("Eu consegui fazer a restauração de documentos!")

    } catch (err) {
      channel.send('`ERROR` ```xl\n' + this.clean(err) + '\n```')
    }
  }
}
