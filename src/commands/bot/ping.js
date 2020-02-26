const Command  = require("../../structures/Command.js");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      alias: ["pong", "latency", "latencia"],
      requirements: {
        onlyGuild: false
      }
    });
  }
  async execute({ client, channel, author, message, t}) {
    channel.send("🏓 Pong").then(msg => {
      setTimeout(function() {
        msg.edit(t("commands:ping", {conexao: client.ping}))
      }, 1000);
    });
  }
};
