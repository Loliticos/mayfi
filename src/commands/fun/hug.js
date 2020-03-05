const { Command, MayfiEmbed, MiscUtils } = require('../../')
const fetch = require("node-fetch")

module.exports = class Hug extends Command {
  constructor (client) {
    super({
      name: 'hug',
      aliases: ['abracar'],
      category: 'fun',
      parameters: [{
        type: 'user', acceptBot: true, acceptSelf: false, missingError: 'commands:hug.noMention'
      }]
    }, client)
  }

  async run ({ channel, author, t}, user) {
    const body = await fetch('https://nekos.life/api/v2/img/hug').then(res => res.json())
    let embed = new MayfiEmbed(author)
      .setTitle(t("commands:hug.title"))
      .setDescription(t("commands:hug.description", { hugger: author, huggedUser: user }))
      .setImage(body.url)
    channel.send({embed})
    
  }
}
