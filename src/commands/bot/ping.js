const { Command, MayfiEmbed } = require('../../')

module.exports = class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["pong", "latency", "latencia"],
      requirements: {
        onlyGuild: false
      }
    })
  }
  async run({ channel, author, message, t}, msg) {
    channel.send(`🏓 \`${this.client.ping}ms\``)
  }
}
