const Permissions = require('../../utils/Permissions.js')
const CommandError = require("./CommandError.js")
const moment = require("moment")

module.exports = class CommandRequirements {
  static parseOptions(options = {}) {
    return {
      botPermissions: options.botPermissions || [],
      permissions: options.permissions || [],

      databaseOnly: !!options.databaseOnly,

      voiceChannelonly: !!options.voiceChannelonly,
      sameVoiceChannelOnly: !!options.sameVoiceChannelOnly,

      onlyGuild: !!options.onlyGuild || true,
      onlyDevs: !!options.onlyDevs || false ,
      nsfwOnly: !!options.nsfwOnly || false
    }
  }


  static handle ({ t, author, channel, client, command, guild, member, voiceChannel }, options) {
    const opts = this.parseOptions(options)

    if(opts.onlyGuild && channel.type === "dm") {
      throw new CommandError(t("errors:guildOnly"))
    }

    if(opts.databaseOnly && !client.database) {
      throw new CommandError(t("errors:databaseOnly"))
    }

    if(opts.onlyDevs && !Permissions.isDev(client, author)) {
      throw new CommandError(t("errors:onlyDevelopers"))
    }

    if (opts.sameVoiceChannelOnly && guild.me.voiceChannelID && (!voiceChannel || guild.me.voiceChannelID !== voiceChannel.id)) {
      throw new CommandError(t("errors:sameVoiceChannelOnly"))
    }

    if (opts.nsfwOnly && !channel.nsfw) {
      throw new CommandError(t("errors:nsfwOnly"))
    }

    if (opts.voiceChannelOnly && !voiceChannel) {
      throw new CommandError(t("errors:voiceChannelOnly"))
    }

    if (opts.permissions && opts.permissions.length > 0) {
      if (!channel.permissionsFor(member).has(opts.permissions)) {
        const permission = opts.permissions.map(p => t(`permissions:${p}`)).map(p => `**"${p}"**`).join(', ')
        const sentence = opts.permissions.length >= 1 ? 'errors:missingOnePermission' : 'errors:missingMultiplePermissions'
        throw new CommandError(t(sentence, { permission }))
      }
    }

    if (opts.botPermissions && opts.botPermissions.length > 0) {
      if (!channel.permissionsFor(guild.me).has(opts.permissions)) {
        const permission = opts.botPermissions.map(p => t(`permissions:${p}`)).map(p => `**"${p}"**`).join(', ')
        const sentence = opts.botPermissions.length >= 1 ? 'errors:botMissingOnePermission' : 'errors:botMissingMultiplePermissions'
        throw new CommandError(t(sentence, { permission }))
      }
    }

   if (command.cooldown > 0 && command.cooldownMap.has(author.id)) {
      throw new CommandError(t("errors:cooldown", { time: moment.duration(command.cooldown * 1000 - (Date.now() - command.cooldownMap.get(author.id))).format('s[s]') }))
    }
  }
}