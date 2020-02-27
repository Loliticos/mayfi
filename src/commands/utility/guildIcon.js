const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class GuildIcon extends Command {
  constructor (client) {
    super({
      name: 'guildicon',
      aliases: ['servericon'],
      category: 'utility',
      parameters: [{
        type: 'guild', full: true, required: false
      }]
    }, client)
  }

  async run ({ channel, t, author }, guild = channel.guild) {

      let embed = new MayfiEmbed(author)

      if (!guild.iconURL) {
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:guildIcon.noImage"))
        return channel.send(embed)
      }


      embed
        .setTitle(guild.name)
        .setImage(guild.iconURL)

      channel.send(embed)
        
  }
}
