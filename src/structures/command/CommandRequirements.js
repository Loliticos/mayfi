const { Permissions } = require('discord.js')
const CommandError = require("./CommandError.js")
const parseOptions = function (options = {}) {
  return {
    permissions: options.permissions || [],
    botPermissions: options.botPermissions || [],

    onlyGuild: !!options.onlyGuild || true,
    onlyDevs: !!options.onlyDevs || false 
  }
}

const handle = function({ t, author, channel, client, command, guild, member, voiceChannel }, options) {
  let opt = parseOptions(options)

  if (opt.onlyGuild && channel.type === "dm") throw new CommandError(t('permissions:guildOnly'))
  if (opt.onlyDevs && !process.env.owners.toString().includes(author.id)) throw new CommandError(t('permissions:onlyDevelopers'))

  if (opt.permissions && !member.hasPermission(opt.permissions)) throw new CommandError(t('permissions:missingPermissions', {
    perms: opt.permissions.map(a => new Permissions(a).toArray()[0]).join(', ')
  }))

  if (opt.botPermissions && opt.botPermissions.length > 0) {
    if (!channel.permissionsFor(guild.me).has(opts.permissions)) {
      const permission = opt.botPermissions.map(p => t(`permissions:${p}`)).map(p => `**"${p}"**`).join(', ')
      const sentence = opt.botPermissions.length >= 1 ? 'errors:botMissingOnePermission' : 'errors:botMissingMultiplePermissions'
      throw new CommandError(t(sentence, { permission }))
    }
  }
}
module.exports = {
  handle
}