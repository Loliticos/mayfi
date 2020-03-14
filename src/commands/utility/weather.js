const { Command, Constants, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

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

  async run ({ channel, author, t}, city) {
    const embed = new MayfiEmbed(author)

    const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`)

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
