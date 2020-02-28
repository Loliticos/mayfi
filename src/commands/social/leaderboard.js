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

    const dbRes = await this.client.database.users.find({}, "rep").sort({ ["rep"]: -1 }).limit(10 + 6)

    const top = dbRes.map(this._users.parse).filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })

    console.log(top)

  }
}
