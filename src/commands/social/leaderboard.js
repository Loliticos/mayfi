const { Command, MayfiEmbed, CommandError, Constants } = require('../../')
const moment = require("moment")

module.exports = class Rep extends Command {
  constructor (client) {
    super({
      name: 'leaderboard',
      aliases: ['top'],
      category: 'social',
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ channel, guild, author, t }) {
    const embed = new MayfiEmbed(author)

    const dbRes = await this.client.database.users.find({}, "reps").sort({ ["reps"]: -1 }).limit(5 + 6)
    const topToCheck = dbRes.filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })
    const top = topToCheck.splice(0, 5)

    embed
      .setTitle("Leaderboard")
      .setDescription(`
        1. __${this.client.users.get(top[0]._id)} (${this.client.users.get(top[0]._id).tag})__\n**Reps**: ${top[0].reps}\n
        2. __${this.client.users.get(top[1]._id)} (${this.client.users.get(top[1]._id).tag})__\n**Reps**: ${top[1].reps}\n
        3. __${this.client.users.get(top[2]._id)} (${this.client.users.get(top[2]._id).tag})__\n**Reps**: ${top[2].reps}\n
        `)
    channel.send(embed)

  }
}
