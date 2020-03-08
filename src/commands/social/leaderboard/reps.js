const { Command, MayfiEmbed } = require('../../../')

module.exports = class ReputationLeaderboard extends Command {
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

    const top = await this.client.controllers.social.leaderboard("reps", 5)

    let description = ""

    for (let i = 0; i < top.length; i++) {
      description += `**${i}.** __${this.client.users.get(top[i]._id)} (${this.client.users.get(top[i]._id).tag})__\n**${t(`commands:${this.path}.reps`)}**: ${top[i].reps}\n\n`
    }

    embed
      .setTitle(t(`commands:${this.path}.title`))
      .setDescription(description)
    channel.send({embed})

  }
}
