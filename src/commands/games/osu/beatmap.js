const { Command, Constants, MayfiEmbed, CommandError } = require('../../../')
const Osu = require('node-osu')
const moment = require("moment")

module.exports = class BeatmapUser extends Command {
  constructor (client) {
    super({
      name: 'beatmap',
      aliases: ['map', 'bm', 'b'],
      category: 'games',
      parent: 'osu',
      parameters: [{
        type: 'string', 
        full: true,
        required: true,
        missingError: "commands:osu.subcommands.beatmap.beatmapNotFound"
      }]
    }, client)
  }

  async run ({ author, t, channel, guild, language }, _beatmap) {
    const embed = new MayfiEmbed(author)

    const osu = new Osu.Api(process.env.OSU_API_KEY, {
        notFoundAsError: true,
        completeScores: false, 
        parseNumeric: false 
    })

    try {
      const beatmap = await osu.apiCall('/get_beatmap', { b: _beatmap, limit: 1 }).then(b => b[0])

      moment.locale(language)

      const rate = ((parseInt(data.passcount) / parseInt(data.playcount)) * 100 || 0).toFixed(1)
      const 

      embed
        .setAuthor("!osu", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Osu%21Logo_%282015%29.png/600px-Osu%21Logo_%282015%29.png")
        .setTitle(`${beatmap.artist} - ${beatmap.title} (${beatmap.version})`)
        .setDescriptionFromBlockArray([
          [
            `:flag_${user.country.toLowerCase()}: **[${user.username}](https://osu.ppy.sh/u/${user.user_id})** (${t(`commands:${this.path}.level`, { number: Math.floor(user.level) })})`,
            t(`commands:${this.path}.difficulty`) + ":" + " " + `**${Number(beatmap.difficultyrating).toFixed(2)}**`,
            t(`commands:${this.path}.successRate`) + ":" + " " + `**${rate}%** (${beatmap.passcount} / ${beatmap.playcount})`
          ]
        ])
        .setImage(`https://assets.ppy.sh/beatmaps/${beatmap.beatmapset_id}/covers/cover.jpg?${Date.now()}`)
        .setColor(this.parentCommand.OSU_COLOR)
      channel.send(embed)
    } catch (e) {
      throw new CommandError(t(`commands:${this.path}.beatmapNotFound`))
    }
  }
}
