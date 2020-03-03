const { Command, MayfiEmbed, CommandError } = require('../../')
const { create, all } = require('mathjs')
const math = create(all)

module.exports = class Channelinfo extends Command {
  constructor (client) {
    super({
      name: 'math',
      aliases: ['conta'],
      category: 'utility',
      parameters: [{
        type: 'string', full: true, missingError: 'commands:math.invalidMathExpression'
      }]
    }, client)
  }

  async run ({author, t, channel}, expression) {

      let embed = new MayfiEmbed(author)

      try {
        let result = math.eval(expression)

        embed.setTitle(t("commands:math.title", { result }))
      } catch(error) {
        throw new CommandError(`${t('commands:math.error')}\n\`${error.message}\``)
      }

      channel.send(embed)
  }
}
