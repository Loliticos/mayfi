const Permissions = require('../utils/Permissions.js')
const CommandError = require("./CommandError.js")
const parseOptions = function (options = {}) {
  return {
    permissions: options.permissions || [],
    botPermissions: options.botPermissions || [],

    onlyGuild: !!options.onlyGuild || true,
    onlyDevs: !!options.onlyDevs || false 
  }
}

module.exports = class CommandRequirements {
  static parseOptions(options = {}) {
    return {
      botPermissions: options.botPermissions || [],
      permissions: options.permissions || [],

      onlyGuild: !!options.onlyGuild || true,
      onlyDevs: !!options.onlyDevs || false 
    }
  }


  static handle ({ t, author, channel, client, command, guild, member, voiceChannel }, options) {
    const opts = this.parseOptions(options)

    if(opts.onlyGuild && channel.type === "dm") {
      throw new CommandError(t("permissions:guildOnly"))
    }

    if(opts.onlyDevs && !Permissions.isDev(client, author)) {
      throw new CommandError(t("permissions:onlyDevelopers"))
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
  }
}