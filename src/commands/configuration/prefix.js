const { Command, Constants, MayfiEmbed } = require('../../')
const i18next = require('i18next')

module.exports = class Prefix extends Command {
  constructor (client) {
    super({
      name: 'prefix',
      category: 'config',
      requirements: {
       guildOnly: true, 
       databaseOnly: true,
       permissions: ['MANAGE_GUILD']
      },
      parameters: [{
        type: 'string', 
        full: true, 
        required: true,
        maxLength: 10,
        missingError: "commands:prefix.missingPrefix"
      }]
    }, client)
  }

  async run ({ channel, author, guild, t }, prefix) {

    let embed = new MayfiEmbed(author)

    try {
      await this.client.database.guilds.updateOne({ _id: guild.id }, { prefix: prefix })
      embed.setTitle(t("commands:prefix.changedTo", { prefix }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
    }

    channel.send({embed})


  }
}
