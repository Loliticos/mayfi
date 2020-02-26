const { Command, MayfiEmbed } = require('../../')

module.exports = class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      alias: ["pong", "latency", "latencia"],
      requirements: {
        onlyGuild: false
      },
      parameters: [{
        type: 'string', full: true, missingError: 'commands:ping.noArguments'
      }]
    });
  }
  async run({ client, channel, author, message, t}, msg) {
    channel.send("🏓 Pong").then(msg => {
      setTimeout(function() {
        msg.edit(t("commands:ping", {conexao: client.ping}))
      }, 1000);
    });

    console.log(msg)
  }
};
