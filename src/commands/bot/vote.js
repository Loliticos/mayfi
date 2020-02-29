const { Command, MayfiEmbed } = require('../../')

module.exports = class Vote extends Command {
  constructor (client) {
    super({
      name: 'vote',
      category: 'bot'
    }, client)
  }

  async run ({ t, author, channel }) {
    channel.send(new MayfiEmbed(author)
      .setDescription(t('commands:vote.howToVote', { link: `https://discordbots.org/bot/${this.client.user.id}/vote` })))
  }
}