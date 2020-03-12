const { Command, MayfiEmbed } = require('../../')
let moment = require("moment")

module.exports = class Weather extends Command {
  constructor (client) {
    super({
      name: 'weather',
      aliases: ['clima', 'clime'],
      category: 'utility',
      requirements: { guildOnly: true},
      parameters: [{
        type: 'city', missingError: "commands:weather.invalidCity"
      }]
    }, client)
  }

  async run ({ message, author, t, language }, city) {

      moment.locale(language)

      let embed = new MayfiEmbed(author)
      .setAuthor(author.username, author.displayavatarURL)
      .addField("ID", channel.id, true)
      .addField(t("commands:channelinfo.createdAt"), `${moment(channel.createdTimestamp).format('LLL')}\n(${moment(channel.createdTimestamp).fromNow()})`, true)   
      .addField(t("commands:channelinfo.position"), channel.position)
      .addField("NSFW", channel.nsfw ? t("commands:channelinfo.nsfwYes") : t("commands:channelinfo.nsfwNo"))
      .addField(t("commands:channelinfo.topic"), channel.topic ? channel.topic : t("commands:channelinfo.noTopic"))
      message.channel.send({embed})
  }
}
