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

    const dbRes = await this.client.database.users.find({}, "reps").sort({ ["reps"]: -1 }).limit(10 + 6)
    const top = dbRes.filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })
    
    const users = () => top.forEach(t => console.log(t._id))

    users()


    embed
      .setTitle("Leaderboard")
      .setDescription(`
        ${top.forEach(t => `${this.client.users.get(t._id) } \`-\` **${t.reps} Reps**\n`)}
        `)
    channel.send(embed)

  }
}
