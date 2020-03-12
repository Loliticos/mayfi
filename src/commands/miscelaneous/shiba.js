const { Command, MayfiEmbed } = require('../../')
const fetch = require("node-fetch")

module.exports = class Shiba extends Command {
  constructor (client) {
    super({
      name: 'shiba',
      category: 'miscelaneous'
    }, client)
  }

  async run ({ channel, author, t}) {
    const body = await fetch('http://shibe.online/api/shibes').then(res => res.json())
    let embed = new MayfiEmbed(author)
      .setTitle("<:shiba:687726072984371326>")
      .setImage(body[0])
    channel.send({embed})
    
  }
}
