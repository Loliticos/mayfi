const { Command, CommandError, MayfiEmbed } = require('../../')

module.exports = class CreateEmoji extends Command {
  constructor (client) {
    super({
      name: 'createemoji',
      aliases: ['newemoji', 'addemoji'],
      category: 'utility',
      requirements: { guildOnly: true, permissions: ['MANAGE_EMOJIS'], botPermissions: ['MANAGE_EMOJIS'] },
      parameters: [{
        type: 'url',
        full: false,
        missingError: 'commands:createemoji.noImage'
      }, {
        type: 'string',
        missingError: 'commands:createemoji.noName'
      }]
    }, client)
  }

  async run ({ t, channel, author, guild }, url, name) {
    const embed = new MayfiEmbed(author)

    try {
      const emoji = await guild.createEmoji(url.href, name)

      embed.setDescription(t('commands:createemoji.created', { emoji }))
        .setThumbnail(url)

      channel.send(embed)
    } catch (e) {
      channel.stopTyping()
      throw new CommandError(`${t('commands:createemoji.error')}\n${e.toString()}`)
    }
  }
}