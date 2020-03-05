const { Command, MayfiEmbed, CommandError, Constants } = require('../../')
const moment = require("moment")

module.exports = class Rep extends Command {
  constructor (client) {
    super({
      name: 'rep',
      aliases: ['reputation'],
      category: 'social',
      requirements: { databaseOnly: true },
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

    let { lastRep } = await this.client.database.users.findOne({_id: author.id})

    if (Date.now() - lastRep < 86400000) {
      embed
        .setTitle(t("commands:rep.alreadyGave"))
        .setDescription(t("commands:rep.youCanGiveAgain", { cooldown: moment.duration(86400000 - (Date.now() - lastRep)).format('h[h] m[m] s[s]') }))
      return channel.send(embed)
    }

    try {
      let userData = await this.client.database.users.findOne({_id: user.id})

      if(!userData) {
          const newUser = new this.client.database.users({
            _id: user.id
          })

          newUser.save()

          embed
            .setTitle(t("errors:generic"))
            .setDescription(t("commands:rep.typeAgain"))
          return channel.send({embed})
      }

      await Promise.all([
        this.client.database.users.updateOne({_id: author.id}, { lastRep: Date.now() }),
        this.client.database.users.updateOne({_id: user.id}, { $inc: { reps: 1 } })
      ])

      channel.send(embed.setDescription(t('commands:rep.repSuccess', { user })))
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}
