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
        missingError: 'commands:marry.invalidUser'
      }, {
        type: 'string',
        required: true,
        missingError: 'commands:marry.invalidText'
      }]
    }, client)
  }

  async run ({ channel, guild, author, t, prefix }, user, text) {
    const embed = new MayfiEmbed(author)

    const userData = await this.client.database.users.findOne({_id: user.id})
    const authorData = await this.client.database.users.findOne({_id: author.id})

    if(userData.married !== "false") {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COOLR)
          .setTitle(t("commands:marry.userAlreadyMarried", { user }))
      )
    }

    if(!authorData.ring) {
      return channel.send(
        embed
          .setColor(Constants.ERROR_COOLR)
          .setTitle(t("commands:marry.noRing"))
          .setDescription(t("commands:marry.noRingDescription", { prefix }))
      )
    }

    channel.send(user)
    channel.send(
      embed
        .setTitle(t("commands:marry.title", { author }))
        .setDescription(text)
        .setImage("https://media.giphy.com/media/oPy4OOpCRgkXm/giphy.gif")
    )

    const filter = c => c.author.equals(user.id) && c.content.toLowercase() == t("commons:yes").toLowerCase() || && c.content.toLowercase() == t("commons:no").toLowerCase()

    channel.awaitMessages(filter, { time: 180000, max: 1 })
    .then(async (collected) => {
      if (collected.content.toLowerCase() === t("commons:no").toLowerCase()) {
        channel.send(author)
        return channel.send(
          embed
            .setColor(Constants.ERROR_COOLR)
            .setTitle(t("commands:marry.recused"))
            .setDescription(t("commands:marry.recusedDescription"))
        )
      }

       try {
        await Promise.all([
          this.client.database.users.updateOne({_id: user.id}, { married: author.id }),
          this.client.database.users.updateOne({_id: author.id}, { married: user.id })
        ])

        embed
          .setTitle(t("commands:marry.accepted"))
          .setDescription(t("commands:marry.acceptedDescription", { user, author }))
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
