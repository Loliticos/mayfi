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
        required: true
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

    const user = await osu.apiCall('/get_user', { u: _user })

    console.log(user[0])

    embed
      .setAuthor("!osu", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Osu%21Logo_%282015%29.png/600px-Osu%21Logo_%282015%29.png")
      .setDescriptionFromBlockArray([
        [
          `:flag_${user.country.toLowerCase()}: **[${user.username}](https://osu.ppy.sh/u/${user.user_id})** (${t(`commands:${this.path}.level`, { number: Math.floor(user.level) })})`
        ]
      ])
    channel.send(embed)

  }
}
