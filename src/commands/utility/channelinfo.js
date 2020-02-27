const { Command, MayfiEmbed } = require('../../')
let moment = require("moment")

module.exports = class Channelinfo extends Command {
  constructor (client) {
    super({
      name: 'channelinfo',
      aliases: ['cinfo'],
      category: 'utility',
      requirements: { guildOnly: true},
      parameters: [{
        type: 'channel', acceptText: true, required: false
      }]
    }, client)
  }

  async run ({ message, author, t, language }, channel = message.channel) {

      moment.locale(language)

      let embed = new MayfiEmbed(author)
      .setAuthor(author.username, author.displayavatarURL)
      .addField("ID", channel.id, true)
      .addField(t("commands:channelinfo.createdAt"), `${moment(channel.createdTimestamp).format('LLL')}\n(${moment(channel.createdTimestamp).fromNow()})`, true)   
      .addField(t("commands:channelinfo.position"), channel.position)
      .addField("NSFW", channel.nsfw ? t("commands:channelinfo.nsfwYes") : t("commands:channelinfo.nsfwNo"))
      .addField(t("commands:channelinfo.topic"), channel.topic ? channel.topic : t("commands:channelinfo.noTopic"))
      message.channel.send(embed)
  }
}
