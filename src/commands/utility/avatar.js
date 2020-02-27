const { Command, MayfiEmbed } = require('../../')

module.exports = class Avatar extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      aliases: ['pic', 'photo'],
      category: 'utility',
      parameters: [{
        type: 'url', full: true, required: false
      }]
    }, client)
  }

  async run ({ channel, author, t}, url) {
    channel.startTyping()
    channel.send(url)

    let embed = new MayfiEmbed(user)
    .setTitle(author.tag)
    .setDescription(t("commands:avatar.avatarMessage", { author }))
    .setImage(author.displayAvatarURL)

    channel.send(embed).then(() => channel.stopTyping())
        
  }
}
