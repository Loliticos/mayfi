const { Command, MayfiEmbed } = require('../../../')

module.exports = class Osu extends Command {
  constructor (client) {
    super({
      name: 'osu',
      category: 'games'
    }, client)
    this.OSU_COLOR = '#E7669F'
  }

  run ({ channel, author, t}) {
    const embed = new MayfiEmbed(author)
      .setDescription(this.subcommands.map(subcmd => {
        return `\`${prefix}${this.name} ${subcmd.name}\` - ${t(`commands:${subcmd.path}.commandDescription`)}`
    }).join('\n'))
    channel.send({embed})
  }
}
