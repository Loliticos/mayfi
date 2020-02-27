const { Command, MayfiEmbed, CommandError, Constants } = require('../../')
const moment = require("moment")

module.exports = class Reps extends Command {
  constructor (client) {
    super({
      name: 'reps',
      aliases: ['reputations'],
      category: 'social',
      requirements: { databaseOnly: true, },
      parameters: [{
        type: 'user', 
        acceptBot: false, 
        acceptSelf: true,
        required: false
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, user = author) {
    const embed = new MayfiEmbed(author)

    try {
      let { reps: UserReps } = await this.client.database.users.findOne({_id: user.id})

      if(!UserReps) {
          const newUser = new this.client.database.users({
            _id: user.id
          })

          newUser.save()

          UserReps = "0"
      }

      embed
        .setTitle(t("commands:reps.title"))
        .setDescription(t("commands:reps.howMany", { reps: UserReps, user, pointPoints: UserReps > 1 ? "points" : "point" }))
 
      channel.send(embed)
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}
