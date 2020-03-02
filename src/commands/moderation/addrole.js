const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Addrole extends Command {
  constructor (client) {
    super({
      name: 'addrole',
      aliases: ['adicionarcargo'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['MANAGE_ROLES'], permissions: ['MANAGE_ROLES'] },
      parameters: [{
        type: 'member',
        required: true,
        acceptSelf: true,
        acceptBot: true
      }, {
        type: 'role', required: true, full: false
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, member, role) {
    const embed = new MayfiEmbed(author)

    try {
      member.addRole(role.id)
      .then(() => {
        embed
          .setTitle(t("commands:addrole.title"))
          .setDescription(t("commands:addrole.description", { role, member }))
        channel.send({ embed: embed })
      })
    } catch(e) {
      throw new CommandError(`${t("errors:generic")}\n\`${e.message}\``)
    }

  }
}
