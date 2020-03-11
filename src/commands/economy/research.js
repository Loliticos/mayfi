const { Command, MayfiEmbed, Constants } = require('../../')

module.exports = class Research extends Command {
  constructor (client) {
    super({
      name: 'research',
      aliases: ['pesquisa', 'pesquisar', 'researches'],
      category: 'economy',
      cooldown: 5,
      requirements: { databaseOnly: true },
      parameters: [{
        type: 'string', 
        required: false,
        full: false
      }]
    }, client)
  }

  async run ({ channel, author, t }, toRepeat = 1) {
    const embed = new MayfiEmbed(author)

    function pluralSingularCheck() {
      if (toRepeat == 1) return "singular"

      if (toRepeat == 0) return "plural"

      if (toRepeat > 1) return "plural"
    }

    try {
      const researchRDM = await this.client.controllers.economy.research(author, toRepeat)

      console.log(researchRDM)

      embed
        .setTitle(t("commands:research.title"))
        .setDescription(t("commands:research.howMany", { research: researchRDM, toRepeat, pluralSingular: pluralSingularCheck }))
 
    } catch(e) {
      switch (e.message) {
        case "INVALID_MATERIALS":
          embed
            .setColor(Constants.ERROR_COLOR)
            .setDescription(t("commands:research", { rg: e.rg, fg: e.fg, requiredGems: e.requiredGems, requiredFragments: e.requiredFragments }))
          break
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
