const { Command, MayfiEmbed } = require('../../')

module.exports = class Avatar extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      aliases: ['pic', 'photo'],
      category: 'utility',
      parameters: [{
       type: 'user', 
       required: false, 
       acceptBot: true
      }]
    })
  }

  async run ({ channel, author, t}, userl = author) {

    console.log(userl)

    let embed = new MayfiEmbed(userl)
    .setTitle(userl.tag)
    .setDescription(t("commands:avatar.avatarMessage", { userl }))
    .setImage(userl.displayAvatarURL)

    channel.send(embed).then(() => channel.stopTyping())
        
  }
}
