const { Command, MayfiEmbed, MiscUtils } = require('../../')
const fetch = require("node-fetch")

module.exports = class Cat extends Command {
  constructor (client) {
    super({
      name: 'cat',
      aliases: ['meow'],
      category: 'fun',
    }, client)
  }

  async run ({ channel, author, t}) {
    const body = await fetch('https://api.thecatapi.com/v1/images/search').then(res => res.json())
    let embed = new MayfiEmbed(author)
      .setImage(body[0].url)
    channel.send(embed)
    
  }
}
