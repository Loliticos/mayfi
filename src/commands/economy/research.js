const { Command, MayfiEmbed, CommandError } = require('../../')

module.exports = class Research extends Command {
  constructor (client) {
    super({
      name: 'research',
      aliases: ['pesquisa', 'pesquisar', 'researches'],
      category: 'economy',
      cooldown: 5,
      requirements: { databaseOnly: true, }
    }, client)
  }

  async run ({ channel, author, t }) {
    const embed = new MayfiEmbed(author)

    try {
      let { gems, fragments } = await this.client.database.users.findOne({_id: author.id})

      if(gems < 10 || fragments < 15) {
        embed
          .setTitle(t("commands:research.invalidMaterial"))
          .setDescription(t("commands:research.youNeed"))
        return channel.send({embed})
      }

      // You'll get somewhere about 23 researches points

      const researchRDM = Math.floor(1 + Math.random() * (23 - 1))

      await this.client.database.users.updateOne({_id: author.id}, { $inc: { gems: -10, fragments: -15, researchesPoints: researchRDM } })

      embed
        .setTitle(t("commands:research.title"))
        .setDescription(t("commands:research.howMany", { research: researchRDM }))
 
      channel.send({embed})
    } catch(err) {
      throw new CommandError(`${t("errors:generic")}\n\`${err.message}\``)
    }
  }
}
