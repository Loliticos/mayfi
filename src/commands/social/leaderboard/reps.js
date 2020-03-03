const { Command, MayfiEmbed } = require('../../../')

module.exports = class Reputation extends Command {
  constructor (client) {
    super({
      name: 'reputation',
      aliases: ['reps'],
      category: 'social',
      parent: "leaderboard",
      hidden: true,
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
      console.log(i)
      description += `**${i}.** __${this.client.users.get(top[i]._id)} (${this.client.users.get(top[i]._id).tag})__\n**${t(`commands:leaderboard.subcommands.reputation.reps`)}**: ${top[i].reps}\n\n`
    }

    embed
      .setTitle(t(`commands:leaderboard.subcommands.reputation.title`))
      .setDescription(description)
    channel.send(embed)

  }
}
