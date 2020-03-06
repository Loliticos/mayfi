const { Command, MayfiEmbed } = require('../../')
const ytdl = require("ytdl-core")

module.exports = class Play extends Command {
  constructor (client) {
    super({
      name: 'play',
      aliases: ['tocar', 'p'],
      category: 'music',
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
        .setDescription(`Now playing: **${songInfo.title}**!`)
    )
  }
}
