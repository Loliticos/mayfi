const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Money extends Command {
  constructor (client) {
    super({
      name: 'money',
      aliases: ['coin', 'coins'],
      category: 'economy',
      requirements: { databaseOnly: true, },
      parameters: [{
        type: 'user', 
        acceptBot: false, 
        acceptSelf: true,
        required: false
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, user = author) {
    const embed = new MayfiEmbed(author)

    try {
      let UserData = await this.client.database.users.findOne({_id: user.id})

      if(!UserData) {
          const newUser = new this.client.database.users({
            _id: user.id
          })

          newUser.save()

          UserData.money = "0"
      }

      embed
        .setTitle(t("commands:money.title"))
        .setDescription(t("commands:money.howMany", { coins: UserData.money, user }))
 
      channel.send(embed)
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}
