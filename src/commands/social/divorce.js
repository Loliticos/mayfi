const { Command, MayfiEmbed, CommandError, Constants } = require('../../')

module.exports = class Divorce extends Command {
  constructor (client) {
    super({
      name: 'divorce',
      aliases: ['divorciar'],
      category: 'social',
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ channel, guild, author, t, prefix }) {
    let embed = new MayfiEmbed(author)

    const authorData = await this.client.database.users.findOne({_id: author.id})

    if (authorData.married == "false") {

    }

    const marriedUser = this.client.users.get(authorData.married)

    await channel.send("Eu estou preparando os papeis do divórcio. Aguarde um pouco...").then(msg => msg.delete(3000))
    
    await Promise.all([
      this.client.database.users.updateOne({_id: marriedUser}, { married: "false" }),
      this.client.database.users.updateOne({_id: author.id}, { married: "false" })
    ])

    channel.send("Tudo bem, eu configurei os papeis do divórcio. Triste que mais umc casal não tenha dado certo!")

  }
}
