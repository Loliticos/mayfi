<<<<<<< HEAD
const { Command, Constants, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")
const moment = require("moment")
=======
const { Command, MayfiEmbed } = require('../../')
let moment = require("moment")
>>>>>>> 22fc91ea458d3a39276c86f185cae8a565941425

module.exports = class Weather extends Command {
  constructor (client) {
    super({
      name: 'weather',
<<<<<<< HEAD
      aliases: ['clima'],
      category: 'utility',
      parameters: [{
        type: 'string', full: true, missingError: "commands:weather.invalidCity"
=======
      aliases: ['clima', 'clime'],
      category: 'utility',
      requirements: { guildOnly: true},
      parameters: [{
        type: 'city', missingError: "commands:weather.invalidCity"
>>>>>>> 22fc91ea458d3a39276c86f185cae8a565941425
      }]
    }, client)
  }

<<<<<<< HEAD
  async run ({ channel, author, t, language}, city) {
    const embed = new MayfiEmbed(author)

    const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`).then(res => res.json())

    if (info.cod == "404" || !info.sys.country) {
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
=======
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
>>>>>>> 22fc91ea458d3a39276c86f185cae8a565941425
}
