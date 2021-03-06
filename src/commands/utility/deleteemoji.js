const { Command, CommandError, MayfiEmbed } = require('../../')

module.exports = class DeleteEmoji extends Command {
  constructor (client) {
    super({
      name: 'deleteemoji',
      aliases: ['removeemoji'],
      category: 'utility',
      requirements: { guildOnly: true, permissions: ['MANAGE_EMOJIS'], botPermissions: ['MANAGE_EMOJIS'] },
      parameters: [{
        type: 'emoji',
        sameGuildOnly: true,
        missingError: 'commands:deleteemoji.invalidEmoji'
      }]
    }, client)
  }

  async run ({ t, channel, author, guild }, emoji) {
    const embed = new MayfiEmbed(author)

    try {
      await guild.deleteEmoji(emoji)

      embed.setDescription(t('commands:deleteemoji.deleted', { emoji }))
        .setThumbnail(emoji.url)

      channel.send({embed})
    } catch (e) {
      channel.stopTyping()
      throw new CommandError(`${t('commands:deleteemoji.error')}\n${e.toString()}`)
    }
  }
}