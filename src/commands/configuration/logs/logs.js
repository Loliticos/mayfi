const { Command, MayfiEmbed } = require('../../../')

module.exports = class Logs extends Command {
  constructor (client) {
    super({
      name: 'logs',
      aliases: ['setlogs'],
      category: 'config',
      requirements: {
       guildOnly: true, 
       databaseOnly: true,
       permissions: ['MANAGE_GUILD']
      }
    }, client)
  }

  async run ({ author, t, channel, prefix }) {
    console.log("a")
    const embed = new MayfiEmbed(author)
      .setDescription(this.subcommands.map(subcmd => {
        return `\`${prefix}${this.name} ${subcmd.name}\` - ${t(`commands:${subcmd.path}.commandDescription`)}`
    }).join('\n'))
    channel.send({embed})
  }
}
