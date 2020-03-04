const { Command, MayfiEmbed } = require('../../../')

module.exports = class Reputation extends Command {
  constructor (client) {
    super({
      name: 'reputation',
      aliases: ['reps'],
      category: 'social',
      parent: "leaderboard",
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ channel, author, t }) {
    const embed = new MayfiEmbed(author)

    const dbRes = await this.client.database.users.find({}, "reps").sort({ ["reps"]: -1 }).limit(5 + 6)

    const users = dbRes.filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })

    const top = users.splice(0, 5)

    let description = ""

    for (let i = 0; i < top.length; i++) {
      description += `**${i}.** __${this.client.users.get(top[i]._id)} (${this.client.users.get(top[i]._id).tag})__\n**${t(`commands:${this.path}.reps`)}**: ${top[i].reps}\n\n`
    }

    embed
      .setTitle(t(`commands:${this.path}.title`))
      .setDescription(description)
    channel.send(embed)

  }
}
