const { Command, MayfiEmbed, CommandError, Constants } = require('../../')
const moment = require("moment")

module.exports = class Leaderboard extends Command {
  constructor (client) {
    super({
      name: 'leaderboard',
      aliases: ['top'],
      category: 'social',
      requirements: { databaseOnly: true },
      parameters: [{
        type: 'string', 
        full: false,
        required: false
      }]
    }, client)
  }

  async run ({ channel, guild, author, t, prefix }, text) {
    const embed = new MayfiEmbed(author)

    if(!text) {
      embed
        .setDescription(t("commands:leaderboard.description", { prefix }))
      return channel.send(embed)
    }

    const lowerCased = text.toLowerCase()

    if(lowerCased !== "reps" && lowerCased !== "level") {
      embed
        .setTitle(t("commands:leaderboard.invalidType"))
        .setDescription(t("commands:leaderboard.description", { prefix }))
      return channel.send(embed)
    }

    const dbRes = await this.client.database.users.find({}, lowerCased).sort({ [lowerCased]: -1 }).limit(5 + 6)
    let points;
    if(text.toLowerCase() == "level") {
      const dbResPoints = await this.client.database.users.find({}, "exp").sort({ ["exp"]: -1 }).limit(5 + 6)
      const topToCheckPoints = dbRes.filter(u => {
        u.user = this.client.users.get(u._id)
        return !!u.user
      })
      const pointsTop = topToCheckPoints.splice(0, 5)
    }
    const topToCheck = dbResPoints.filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })
    const top = topToCheck.splice(0, 5)

    console.log(top)

    embed
      .setTitle(t(`commands:leaderboard.title${text}`))
      .setDescription(`
        **1.** __${this.client.users.get(top[0]._id)} (${this.client.users.get(top[0]._id).tag})__\n**${t(`commands:leaderboard.${lowerCased == "reps" ? "reps" : "level"}`)}**: ${top[0][lowerCased == "reps" ? "reps" : "level"]} ${text == "level" ? `- **${t("commands:leaderboard.points")}**: ${pointsTop[0].exp}` : ""}\n
        **2.** __${this.client.users.get(top[1]._id)} (${this.client.users.get(top[1]._id).tag})__\n**${t(`commands:leaderboard.${lowerCased == "reps" ? "reps" : "level"}`)}**: ${top[1][lowerCased == "reps" ? "reps" : "level"]} ${text == "level" ? `- **${t("commands:leaderboard.points")}**: ${pointsTop[0].exp}` : ""}\n
        **3.** __${this.client.users.get(top[2]._id)} (${this.client.users.get(top[2]._id).tag})__\n**${t(`commands:leaderboard.${lowerCased == "reps" ? "reps" : "level"}`)}**: ${top[2][lowerCased == "reps" ? "reps" : "level"]} ${text == "level" ? `- **${t("commands:leaderboard.points")}**: ${pointsTop[0].exp}` : ""}\n
        `)
    channel.send(embed)

  }
}
