const { Command, MayfiEmbed, CommandError, Constants } = require('../../')

module.exports = class Marry extends Command {
  constructor (client) {
    super({
      name: 'marry',
      aliases: ['casar'],
      category: 'social',
      requirements: { databaseOnly: true },
      parameters: [{
        type: 'member', 
        required: true,
        acceptSelf: false,
        acceptBot: false,
        missingError: 'commands:marry.invalidUser'
      }, {
        type: 'string',
        required: true,
        full: true,
        missingError: 'commands:marry.invalidText'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t, prefix, message }, member, text) {
    let embed = new MayfiEmbed(author)

    const userData = await this.client.database.users.findOne({_id: member.id})
    const authorData = await this.client.database.users.findOne({_id: author.id})

    if(authorData.married !== "false") {

      const user = this.client.users.get(authorData.married)

      if(!user) return

      user.send(t("commands:marry.alert", { guild, channel, member }))
      return channel.send(
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:marry.authorAlreadyMarried"))
      )
    }

    if(userData.married !== "false") {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:marry.userAlreadyMarried", { member }))
      )
    }

    if(!authorData.ring) {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COLOR)
          .setTitle(t("commands:marry.noRing"))
          .setDescription(t("commands:marry.noRingDescription", { prefix }))
      )
    }

    message.delete()

    channel.send(`<@${member.id}>`)
    channel.send(
      embed
        .setTitle(t("commands:marry.title", { author }))
        .setDescription(text)
        .setImage("https://media.giphy.com/media/oPy4OOpCRgkXm/giphy.gif")
        .setFooter(t("commands:marry.footer"))
    )

    const filter = c => c.author.id == member.id && c.content.toLowerCase() == t("commons:yes").toLowerCase() || c.content.toLowerCase() == t("commons:no").toLowerCase()

    const collector = channel.createMessageCollector(filter, { time: 180000, max: 1 })

    collector.on("collect", async (m) => {
      embed = new MayfiEmbed()
      collector.stop()
      if (m.content.toLowerCase() === t("commons:no").toLowerCase()) {
        channel.send(`<@${author.id}>`)
        return channel.send(
          embed
            .setColor(Constants.ERROR_COOLR)
            .setTitle(t("commands:marry.recused"))
            .setDescription(t("commands:marry.recusedDescription"))
        )
      }

       try {
        await Promise.all([
          this.client.database.users.updateOne({_id: member.id}, { married: author.id }),
          this.client.database.users.updateOne({_id: author.id}, { married: member.id })
        ])

        embed
          .setTitle(t("commands:marry.accepted"))
          .setDescription(t("commands:marry.acceptedDescription", { member, author }))
          .setImage("https://3.bp.blogspot.com/-aIudQs8QDi0/VSv1CrZhXlI/AAAAAAAAA14/dwthdzNydyM/s1600/Saito_x_louise3.gif")
        return channel.send(embed)
       } catch (e) {
        console.error(e)

        return channel.send(
          embed
            .setColor(Constants.ERROR_COOLR)
            .setTitle(t("errors:generic"))
        )
       }
    })
  }
}
