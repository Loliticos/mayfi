const { Command, Constants, MayfiEmbed } = require('../../../')
const Osu = require('node-osu')

module.exports = class OsuUser extends Command {
  constructor (client) {
    super({
      name: 'user',
      aliases: ['usuario'],
      category: 'games',
      parent: 'osu',
      parameters: [{
        type: 'string', 
        full: true,
        required: true,
        missingError: "commands:osu.subcommands.user.userNotFound"
      }]
    }, client)
  }

  async run ({ author, t, channel, guild }, _user) {
    const embed = new MayfiEmbed(author)

    const osu = new Osu.Api(process.env.OSU_API_KEY, {
        notFoundAsError: true,
        completeScores: false, 
        parseNumeric: false 
    })

    const userData = await osu.apiCall('/get_user', { u: _user })

    const user = userData[0]

    embed
      .setAuthor("!osu", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Osu%21Logo_%282015%29.png/600px-Osu%21Logo_%282015%29.png")
      .setDescriptionFromBlockArray([
        [
          `:flag_${user.country.toLowerCase()}: **[${user.username}](https://osu.ppy.sh/u/${user.user_id})** (${t(`commands:${this.path}.level`, { number: Math.floor(user.level) })})`
        ],
        [
          `**${user.count_rank_ssh}** ${Constants.OSU_SSH}, **${user.count_rank_ss}** ${Constants.OSU_SS}, **${user.count_rank_sh}** ${Constants.OSU_SH}, **${user.count_rank_s}** ${Constants.OSU_S}, **${user.count_rank_a}** ${Constants.OSU_A}`
        ]
      ])
      .setColor(this.parentCommand.OSU_COLOR)
    channel.send(embed)

  }
}
