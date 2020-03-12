const { Command, MayfiEmbed } = require('../../')

module.exports = class Adorable extends Command {
  constructor (client) {
    super({
      name: 'adorable',
      category: 'miscelaneous'
    }, client)
  }

  async run ({ channel, author}) {
    let embed = new MayfiEmbed(author)
      .setImage(`https://api.adorable.io/avatars/256/${author.avatar}.png`)
    channel.send({embed})
    
  }
}
