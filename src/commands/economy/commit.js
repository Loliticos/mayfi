const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Commit extends Command {
  constructor (client) {
    super({
      name: 'commit',
      aliases: ['change', 'trocar'],
      category: 'economy',
      requirements: { databaseOnly: true, },
      parameters: [{
        type: 'string', 
        required: true,
        missingError: "commands:commit.noArguments"
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, gems) {
    const embed = new MayfiEmbed(author)

    try {
      let UserData = await this.client.database.users.findOne({_id: author.id})

      if(UserData.gems < gems) {
        embed
          .setTitle(t("commands:commit.noValue"))
          .setDescription(t("commands:commit.youCantCommit", { gems }))
        return channel.send(embed)
      }

      const transfered = gems * 4

      await this.client.database.users.updateOne({_id: author.id}, { $inc: { gems: -gems, money: transfered }})
      
      embed
        .setTitle(t("commands:commit.title"))
        .setDescription(t("commands:commit.transfered", { gems, transfered }))
 
      channel.send(embed)
    } catch(err) {
      throw new CommandError(t("errors:generic"))
    }
  }
}
