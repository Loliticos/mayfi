const { Command, MayfiEmbed, MiscUtils } = require('../../')
const fetch = require("node-fetch")

module.exports = class Dog extends Command {
  constructor (client) {
    super({
      name: 'dog',
      aliases: ['cachorro'],
      category: 'fun',
    }, client)
  }

  async run ({ channel, author, t}) {
    const body = await fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json())
    let embed = new MayfiEmbed(author) 
      .setTitle("🐶")
      .setImage(body.message)
    channel.send(embed)
    
  }
}
