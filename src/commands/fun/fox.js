const { Command, MayfiEmbed } = require('../../')
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
    const { image } = await fetch('https://randomfox.ca/floof/').then(res => res.json())
    let embed = new MayfiEmbed(author)
      .setTitle("🦊")
      .setImage(image)
    channel.send(embed)
    
  }
}
