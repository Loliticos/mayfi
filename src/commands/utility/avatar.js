const { Command, MayfiEmbed } = require('../../')

module.exports = class Avatar extends Command {
  constructor (client) {
    super({
      name: 'avatar',
      aliases: ['pic', 'photo'],
      category: 'utility',
      parameters: [{
       type: 'user', 
       required: false, 
       acceptBot: true
      }]
    }, client)
  }

  async run ({ channel, author, t}, user = author) {

    let embed = new MayfiEmbed(author)
    .setTitle(user.tag)
    .setDescription(t("commands:avatar.avatarMessage", { user }))
    .setImage(user.displayAvatarURL)

    channel.send(embed).then(() => channel.stopTyping())
        
  }
}
