const { Command, MayfiEmbed, CommandError, Constants } = require('../../')

module.exports = class Personaltext extends Command {
  constructor (client) {
    super({
      name: 'personalText',
      aliases: ['sobremim', 'perfil', 'aboutme'],
      category: 'social',
      requirements: { databaseOnly: true },
      parameters: [{
        type: 'string', 
        full: true,
        required: true
        missingError: 'commands:personalText.noArguments'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, aboutme) {
    const embed = new MayfiEmbed(author)

    try {
      let userData = await this.client.database.users.findOne({_id: user.id})

      await Promise.all([
        this.client.database.users.updateOne({_id: author.id}, { personalText: aboutme })
      ])

      channel.send(embed.setDescription(t('commands:personalText.changedTo', { aboutme })))
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}
