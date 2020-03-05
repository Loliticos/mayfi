const { Command, Constants, MayfiEmbed } = require('../../')

module.exports = class Logs extends Command {
  constructor (client) {
    super({
      name: 'logs',
      aliases: ['logschannel', 'setlogs'],
      category: 'config',
      requirements: {
       guildOnly: true, 
       databaseOnly: true,
       permissions: ['MANAGE_GUILD']
      },
      parameters: [{
        type: 'channel', 
        required: true,
        acceptText: true,
        missingError: "commands:logs.missingChannel"
      }]
    }, client)
  }

  async run ({ message, author, guild, t }, channel) {

    let embed = new MayfiEmbed(author)

    try {
      await this.client.database.guilds.updateOne({ _id: guild.id }, { logsChannel: channel.id })
      embed
        .setTitle(t("commands:logs.title"))
        .setDescription(t("commands:logs.changedTo", { channel }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
    }

    message.channel.send({embed})


  }
}
