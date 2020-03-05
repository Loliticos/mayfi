const { Command, MayfiEmbed, Constants, CommandError } = require('../../')

module.exports = class Poll extends Command {
  constructor (client) {
    super({
      name: 'poll',
      aliases: ['question'],
      category: 'utility',
      parameters: [{
        type: 'string', full: true, required: true, missingError: "commands:poll.noArguments"
      }]
    }, client)
  }

  async run ({ channel, author, t, message}, question) {
    
    message.delete()
    
    const embed = new MayfiEmbed()
    
    const toSplit = question.split("|")
    
    if(toSplit.slice(1).length > 1){
      const spliced = toSplit.splice(1, 2)

      embed.setTitle(`🗳️ ${toSplit[0]}`)
      embed.setDescription(`:regional_indicator_a: ${spliced[0]}\n :regional_indicator_b: ${spliced[1]}`)
      channel.send({embed}).then(msg => {
        msg.react("🇦").then(() => msg.react("🇧"))
      })
    } else if(toSplit.slice(1).length == 1) {
        const spliced = toSplit.splice(1, 2)

        embed.setTitle(`🗳️ ${toSplit[0]}`)
        embed.setDescription(`:regional_indicator_a: ${spliced[0]}`)
        channel.send({embed}).then(msg => {
          msg.react("🇦")
        })
    } else {
      embed.setTitle(`🗳️ ${toSplit[0]}`)
      channel.send({embed}).then(msg => {
        msg.react("👍").then(() => msg.react("👎"))
      })
    }
  } 
}
