const { Command, MayfiEmbed, Constants } = require('../../')

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
      const researchRDM = await this.client.controllers.economy.research(author)

      console.log(researchRDM)

      embed
        .setTitle(t("commands:research.title"))
        .setDescription(t("commands:research.howMany", { research: researchRDM }))
 
    } catch(e) {
      switch (e.message) {
        case "INVALID_MATERIALS":
          embed
            .setColor(Constants.ERROR_COLOR)
            .setDescription(t("commands:research", { howMuchGems: 10 - e.gems, howMuchFragments: 15 - e.fragments }))
        default:
          console.error(e)
          embed
            .setColor(Constants.ERROR_COLOR)
            .setTitle(t("errors:generic"))
      }
    }

    channel.send(embed)
  }
}
