const { Command, MayfiEmbed } = require('../../')

module.exports = class Avatar extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      aliases: ['pic', 'photo'],
      category: 'utility',
      parameters: [{
        type: 'user', full: true, required: false, acceptBot: true
      }]
    }, client)
  }

  async run ({ channel, author, t}, user = author) {

    console.log(user)

     channel.startTyping()

      let embed = new MayfiEmbed(user)
      .setTitle(user.tag)
      .setDescription(t("commands:avatar.avatarMessage", { user }))
      .setImage(user.displayAvatarURL)

      channel.send(embed).then(() => channel.stopTyping())
        
  }
}
