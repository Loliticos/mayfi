const { Command, MayfiEmbed } = require('../../')

module.exports = class Personaltext extends Command {
  constructor (client) {
    super({
      name: 'personaltext',
      aliases: ['sobremim', 'perfil', 'aboutme'],
      category: 'social',
      requirements: { databaseOnly: true },
      parameters: [{
        type: 'string', 
        full: true,
        required: true,
        missingError: 'commands:personaltext.noArguments'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, aboutme) {
    const embed = new MayfiEmbed(author)

    await this.client.controllers.social.personalTextChange(author, aboutme)

    channel.send(embed.setDescription(t('commands:personaltext.changedTo', { aboutme })))
  }
}
