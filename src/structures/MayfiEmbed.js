const { RichEmbed } = require('discord.js')

/**
 * A Discord Embed that has informations already filled
 * @constructor
 * @param {User} [user] - User to represent the embed.
 * @param {object} [data] - Information of the embed
 */
module.exports = class MayfiEmbed extends RichEmbed {
  constructor (user, data = {}) {
    super(data)
    this.setColor(process.env.EMBED_COLOR).setTimestamp()
    if (user) this.setFooter(user.tag)
  }

  setDescriptionFromBlockArray (blocks) {
    this.description = blocks.map(lines => lines.filter(l => !!l).join('\n')).filter(b => !!b.length).join('\n\n')
    return this
  }
}
