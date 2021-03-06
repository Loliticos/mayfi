const { Command, MayfiEmbed } = require('../../')

module.exports = class EightBall extends Command {
  constructor (client) {
    super({
      name: '8ball',
      aliases: ['duvida'],
      category: 'miscelaneous',
      parameters: [{
        type: 'string', full: true, missingError: 'commands:8ball.noText', 
      }]
    }, client)
  }

  async run ({ channel, t, author }, text) {
    const answerCount = 15
    const result = Math.floor((Math.random() * answerCount))

    const embed = new MayfiEmbed(author)
    .setDescription(`❓ ${text}\n🎱 ${t(`commands:8ball.answers.${result}`)}`)
    channel.send({embed})
        
  }
}
