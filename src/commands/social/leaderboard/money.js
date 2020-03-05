const { Command, MayfiEmbed } = require('../../../')

module.exports = class MoneyLeaderboard extends Command {
  constructor (client) {
    super({
      name: 'money',
      aliases: ['coins', 'coin', 'dinheiro'],
      category: 'social',
      parent: "leaderboard",
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ channel, author, t }) {
    const embed = new MayfiEmbed(author)

    const dbRes = await this.client.database.users.find({}, "money").sort({ ["money"]: -1 }).limit(5 + 6)

    const users = dbRes.filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })

    const top = users.splice(0, 5)

    let description = ""

    for (let i = 0; i < top.length; i++) {
      description += `**${i}.** __${this.client.users.get(top[i]._id)} (${this.client.users.get(top[i]._id).tag})__\n**${t(`commands:${this.path}.money`)}**: ${top[i].money}\n\n`
    }

    embed
      .setTitle(t(`commands:${this.path}.title`))
      .setDescription(description)
    channel.send({embed})

  }
}
