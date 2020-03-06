const { Command, MayfiEmbed, CommandError, Constants } = require('../../')
const moment = require("moment")
const ytdl = require("ytdl-core")

module.exports = class Rep extends Command {
  constructor (client) {
    super({
      name: 'rep',
      aliases: ['reputation'],
      category: 'social',
      requirements: { voiceChannelonly: true, sameVoiceChannelOnly: true },
      parameters: [{
        type: 'string', 
        full: true, 
        missingError: 'errors:invalidUser'
      }]
    }, client)
  }

  async run ({ channel, author, t, voiceChannel }, song) {
    const embed = new MayfiEmbed(author)

    const songInfo = await ytdl.getInfo(song)

    const connection = await voiceChannel.join()

    const dispatcher = await connection.playStream(ytdl(song, { filter: "audioonly" }))

    channel.send(
      embed
        .setTitle("Song")
        .setDescription(`Now playing: **${info.title}**!`)
    )
  }
}
