const { Command, MayfiEmbed, MiscUtils } = require('../../')
const fetch = require("node-fetch")

module.exports = class Kiss extends Command {
  constructor (client) {
    super({
      name: 'kiss',
      aliases: ['beijar'],
      category: 'fun',
      parameters: [{
        type: 'user', acceptBot: true, acceptSelf: false, missingError: 'commands:kiss.noMention'
      }]
    }, client)
  }

  async run ({ channel, author, t}, user) {
    const body = await fetch('https://nekos.life/api/v2/img/kiss').then(res => res.json())
    let embed = new MayfiEmbed(author)
      .setTitle(t("commands:kiss.title"))
      .setDescription(t("commands:kiss.description", { hugger: author, huggedUser: user }))
      .setImage(body.url)
    channel.send({embed})
    
  }
}
