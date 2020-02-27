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

    console.log(user)

    let embed = new MayfiEmbed(user)
    .setTitle(user.tag)
    .setDescription(t("commands:avatar.avatarMessage", { user }))
    .setImage(user.displayAvatarURL)

    channel.send(embed).then(() => channel.stopTyping())
        
  }
}
