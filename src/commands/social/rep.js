const { Command, MayfiEmbed, CommandError, Constants } = require('../../')

module.exports = class Rep extends Command {
  constructor (client) {
    super({
      name: 'rep',
      aliases: ['reputation'],
      category: 'social',
      requirements: { databaseOnly: true, },
      parameters: [{
        type: 'user', 
        acceptBot: false, 
        acceptSelf: false,
        missingError: 'errors:invalidUser',
        errors: { acceptSelf: 'commands:rep.repYourself' }
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, user) {
    const embed = new MayfiEmbed(author)

    const { lastRep } = await this.client.database.users.findOne({_id: author.id})


    if (Date.now() - lastRep < 86400000) {
      embed
        .setTitle(t("commands:rep.alreadyGave"))
        .setDescription(t("commands:rep.youCanGiveAgain", { cooldown: moment.duration(86400000 - (now - lastRep)).format('h[h] m[m] s[s]') }))
      return channel.send(embed)
    }

    const dataUser = await this.client.database.users.findOne({_id: user.id})

    await Promise.all([
      this.client.database.users.updateOne({_id: author.id}, { lastRep: Date.now() }),
      this.client.database.users.updateOne({_id: user.id}, { reps: dataUser.reps += 1})
    ])
    
    channel.send(embed.setDescription(t('commands:rep.repSuccess', { user })))
  }
}
