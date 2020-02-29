const { EventHandler, MayfiEmbed, Constants } = require('../');

module.exports = class GuildLogging extends EventHandler {
    constructor(client) {
        super(client, 'guildCreate')
    }

    run(guild) {
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
    }
};
