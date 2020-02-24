const { Permissions } = require('discord.js')
const CommandError = require("./CommandError.js")
const parseOptions = function (options = {}) {
  return {
    permissions: options.permissions || [],
    botPermissions: options.botPermissions || [],

    onlyGuild: !!options.onlyGuild || true,
    onlyDevs: !!options.onlyDevs || false ,
  }
}

const handleRequirements = function ({ author, channel, client, guild, member, me, t }, options) {
  let opt = parseOptions(options)

  if (opt.onlyGuild && channel.type === "dm") throw new CommandError(t('permissions:guildOnly'))
  if (opt.onlyDevs && !process.env.owners.toString().includes(author.id)) throw new CommandError(t('permissions:onlyDevelopers'))

  if (opt.botPermissions && !me.hasPermission(opt.botPermissions)) throw new CommandError(t('permissions:meWithoutPermission', {
    perms: opt.botPermissions.map(a => new Permissions(a).toArray()[0]).join(', ')
  }))
  if (opt.permissions && !member.hasPermission(opt.permissions)) throw new CommandError(t('permissions:missingPermissions', {
    perms: opt.permissions.map(a => new Permissions(a).toArray()[0]).join(', ')
  }))
}
module.exports = {
  handleRequirements
}