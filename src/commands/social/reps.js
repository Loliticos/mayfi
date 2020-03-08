const { Command, MayfiEmbed, CommandError } = require('../../')

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

    const userReps = await this.client.controllers.social.getReps(user)

    function checkValue (value) {
      if (value > 1) return "points"
      if (value == 0) return "points"
      if (value == 1) return "point"
    }

    embed
      .setTitle(t("commands:reps.title"))
      .setDescription(t("commands:reps.howMany", { reps: userReps, user, pointPoints: checkValue(userReps) }))
 
    channel.send({embed})
  }
}
