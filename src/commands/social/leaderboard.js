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

    if(text.toLowerCase() !== "reps" && text.toLowerCase() !== "level") {
      embed
        .setTitle(t("commands:leaderboard.invalidType"))
        .setDescription(t("commands:leaderboard.description", { prefix }))
      return channel.send(embed)
    }

    const dbRes = await this.client.database.users.find({}, text.toLowerCase()).sort({ [text.toLowerCase()]: -1 }).limit(5 + 6)
    const topToCheck = dbRes.filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })
    const top = topToCheck.splice(0, 5)

    console.log(top)

    embed
      .setTitle(t(`commands:leaderboard.title${text}`))
      .setDescription(`
        **1.** __${this.client.users.get(top[0]._id)} (${this.client.users.get(top[0]._id).tag})__\n**${t(`commands:leaderboard.${text == "reps" ? "reps" : "level"}`)}**: ${top[0][text == "reps" ? "reps" : "level"]} ${text == "level" ? `- **${t("commands:leaderboard.points")}**: ` : ""}\n
        **2.** __${this.client.users.get(top[1]._id)} (${this.client.users.get(top[1]._id).tag})__\n**${t(`commands:leaderboard.${text == "reps" ? "reps" : "level"}`)}**: ${top[1][text == "reps" ? "reps" : "level"]} ${text == "level" ? `- **${t("commands:leaderboard.points")}**:` : ""}\n
        **3.** __${this.client.users.get(top[2]._id)} (${this.client.users.get(top[2]._id).tag})__\n**${t(`commands:leaderboard.${text == "reps" ? "reps" : "level"}`)}**: ${top[2][text == "reps" ? "reps" : "level"]} ${text == "level" ? `- **${t("commands:leaderboard.points")}**:` : ""}\n
        `)
    channel.send(embed)

  }
}
