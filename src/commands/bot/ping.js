const { Command, MayfiEmbed } = require('../../')

module.exports = class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      alias: ["pong", "latency", "latencia"],
      requirements: {
        onlyGuild: false
      }
    });
  }
  async run({ client, channel, author, message, t}) {
    channel.send("🏓 Pong").then(msg => {
      setTimeout(function() {
        msg.edit(t("commands:ping", {conexao: client.ping}))
      }, 1000);
    });
  }
};
