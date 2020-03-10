const { Command, MayfiEmbed, Constants } = require('../../')
const fs = require("fs")
const ms = require("ms")

module.exports = class Remind extends Command {
  constructor (client) {
    super({
      name: 'remind',
      aliases: ['remindme', 'lembrar'],
      category: 'utility',
      requirements: { guildOnly: false },
      parameters: [{
        type: "time", full: true, acceptDate: true, required: true, missingError: "commands:remind.invalidDate"
      }, {
        type: "string", full: true, required: true
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, date, reason) {

    const embed = new MayfiEmbed(author)

    try {
      this.client.remind[author.id] = {
        id: author.id,
        time: Date.now() + date,
        guild: guild.id,
        reason
      }

      fs.writeFile("../../../remind.json", JSON.stringify(this.client.remind, null, 4), err => {
        if (err) console.error
          
        channel.send(        
          embed
            .setTitle(t("commands:remind.remindYou", { user, time: ms(date) }))
        )
      })

    } catch(err) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t('errors:generic'))
          .setDescription(`\`${err}\``)
        return channel.send({embed})
    }
  }
}
