const { Command, Constants, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")
const moment = require("moment")

module.exports = class Weather extends Command {
  constructor (client) {
    super({
      name: 'weather',
      aliases: ['clima'],
      category: 'utility',
      parameters: [{
        type: 'string', full: true, missingError: "commands:weather.invalidCity"
      }]
    }, client)
  }

  async run ({ channel, author, t, language}, city) {
    const embed = new MayfiEmbed(author)

    const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`).then(res => res.json())

    console.log(info)

    if (info.cod == "404") {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t("commands:weather.invalidCity"))
      return channel.send(embed)
    }

    moment.locale(language)

    embed
      .setTitle(`:flag_${info.sys.country.toLowerCase()}: ${info.name} - ${info.weather[0].main}`)
      .setDescription(info.weather[0].description[0].toUpperCase() + info.weather[0].description.slice(1))
      .addField(t("commands:weather.temperature"), (info.main.temp - 273.15).toFixed(2))
      .addField(t("commands:weather.info"), `**${t("commands:weather.sunRise")}**: ${moment(info.sys.sunrise).format('LTS')}\n**${t("commands:weather.sunSet")}**: ${moment(info.sys.sunset).format('LTS')}`)

    channel.send({embed})
  } 
}
