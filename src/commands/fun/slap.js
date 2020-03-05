const { Command, MayfiEmbed, MiscUtils } = require('../../')
const fetch = require("node-fetch")

module.exports = class Slap extends Command {
  constructor (client) {
    super({
      name: 'slap',
      aliases: ['tapa'],
      category: 'fun',
      parameters: [{
        type: 'user', acceptBot: true, acceptSelf: false, missingError: 'commands:slap.noMention'
      }]
    }, client)
  }

  async run ({ channel, author, t}, user) {
    const body = await fetch('https://nekos.life/api/v2/img/slap').then(res => res.json())
    let embed = new MayfiEmbed(author)
      .setTitle(t("commands:slap.title"))
      .setDescription(t("commands:slap.description", { hugger: author, huggedUser: user }))
      .setImage(body.url)
    channel.send({embed})
    
  }
}
