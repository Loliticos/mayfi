const { Command, MayfiEmbed, Constants } = require('../../')
const fetch = require('node-fetch')

module.exports = class History extends Command {
  constructor (client) {
    super({
      name: 'history',
      aliases: ['today-in-history'],
      category: 'miscelaneous',
      parameters: [{
        type: 'string',
        missingError: 'commands:history.invalidDate'
      }]
    }, client)
  }

  async run ({ t, author, channel }, date) {
    const embed = new MayfiEmbed(author)

    try {
      const body = await fetch(`http://history.muffinlabs.com/date/${date}`).then(res => res.json())

      const events = body.data.Events
      const event = events[Math.floor(Math.random() * events.length)]

      embed
        .setTitle(t("commands:history.date", { date: body.date }))
        .setURL(body.url)
        .setDescription(`${event.year}: ${event.text}`)
        .addField(t("commands:history.seeMore"),
          event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join(', '))
      channel.send(embed)

    } catch(err) {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:history.invalidDate"))
      )
    }
  }
}
