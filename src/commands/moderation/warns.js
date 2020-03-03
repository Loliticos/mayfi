const { Command, MayfiEmbed } = require('../../')

module.exports = class Warns extends Command {
  constructor (client) {
    super({
      name: 'warns',
      aliases: ['avisos'],
      category: 'moderation',
      parameters: [{
        type: 'member', full: true, required: false, acceptBot: true
      }]
    }, client)
  }

  async run ({ channel, member: author, t }, member = author) {
    const userData = await this.database.users.findOne({_id: member.user.id})

    const embed = new MayfiEmbed(author)
    .setTitle(t("commands:warns.userWarns", { warns: userData.warns, member }))
    channel.send(embed)

  }
}
