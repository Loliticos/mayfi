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

    function convertTemperature (temperature) {
      return (temperature - 273.15).toFixed(2)
    }

    moment.locale(language)

    embed
      .setTitle(`:flag_${info.sys.country.toLowerCase()}: ${info.name} - ${info.weather[0].main}`)
      .setDescription(info.weather[0].description[0].toUpperCase() + info.weather[0].description.slice(1))
      .addField(
        t("commands:weather.temperatureAndMore"),
        `**${t("commands:weather.temperature")}**: ${convertTemperature(info.main.temp)}°C
        **${t("commands:weather.feelsLike")}**: ${convertTemperature(info.main.feels_like)}°C
        **${t("commands:weather.temp_min")}**: ${convertTemperature(info.main.temp_min)}°C
        **${t("commands:weather.temp_max")}**: ${convertTemperature(info.main.temp_max)}°C
        **${t("commands:weather.humidity")}**: ${info.main.humidity}%`)
      .addField(t("commands:weather.info"),
      `**${t("commands:weather.sunRise")}**: ${moment(info.sys.sunrise).format('LTS')}
      **${t("commands:weather.sunSet")}**: ${moment(info.sys.sunset).format('LTS')}
      **${t("commands:weather.windSpeed")}**: ${info.wind.speed}
      `)

    channel.send({embed})
  } 
}
