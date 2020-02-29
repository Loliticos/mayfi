const { Command, MayfiEmbed } = require('../../')

module.exports = class Ping extends Command {
  constructor(client) {
    super({
      name: "ping",
      category: "bot",
      aliases: ["pong", "latency", "latencia"],
      requirements: {
        onlyGuild: false
      }
    }, client)
  }
  async run({ channel, author, message, t}, msg) {
    channel.send(`🏓 \`${Math.floor(this.client.ping)}ms\``)
  }
}
