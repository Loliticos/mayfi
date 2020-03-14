const { Command, Constants, MayfiEmbed } = require('../../')
const weather = require("yahoo-weather")

module.exports = class Weather extends Command {
  constructor (client) {
    super({
      name: 'weather',
      aliases: ['clima'],
      category: 'utility',
      parameters: [{
        type: 'string', full: true, required: true, missingError: "commands:weather.invalidCity"
      }]
    }, client)
  }

  async run ({ channel, author, t, message, language}, city) {

    const info = await weather(city)

    console.log(info)
        
    if (!info) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:weather.invalidCity"))
      return channel.send(embed)
    }

    channel.send({embed})
  } 
}
