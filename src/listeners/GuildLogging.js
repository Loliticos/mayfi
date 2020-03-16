const { EventHandler, MayfiEmbed, Constants } = require('../');

module.exports = class GuildLogging extends EventHandler {
    constructor(client) {
        super(client, 'guildCreate')
    }

    run(guild) {
      if (!guild.available) return

      if (guild.id === "538361750651797504") return

      const CHANNEL_ID = process.env.LOGGING_CHANNEL_ID
      console.log(`[Guilds] Added to "${guild.name}" (${guild.id})`)
      if (CHANNEL_ID) {
        this.client.channels.get(CHANNEL_ID).send(
          new MayfiEmbed()
          .setColor(Constants.GUILD_ADDED_COLOR)
          .setTitle(`Added to "${guild.name}"`)
          .setDescription(`\`${guild.id}\``)
          .setFooter(`Gained ${guild.members.size} members`)
          )
      }

      try {
        guild.owner.send(
          new MayfiEmbed()
          .setAuthor(`Thanks for adding me to the guild ${guild.name}!`, guild.iconURL)
          .addField("Get started", "Type the command `m!help` to see all my available commands.", true)
          .addField("Special Support", "Join my [support server](https://discord.gg/tvN7cGJ) or take a look at my [documentation](https://mayfi.gitbook.io/docs/).", true)
        )
      } catch(e) {
        false
      }
    }
}
