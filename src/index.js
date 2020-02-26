const CommandStructures = require('./structures/command/')

module.exports = {
  // Command Structures
  CommandStructures,
  Command: CommandStructures.Command,
  CommandContext: CommandStructures.CommandContext,
  CommandError: CommandStructures.CommandError,
  CommandRequirements: CommandStructures.CommandRequirements,

  // Loaders
  CommandLoader: require('./loaders/CommandLoader.js'),
  ListenerLoader: require("./loaders/ListenerLoader.js"),
  LocaleLoader: require("./loaders/LocaleLoader.js"),

  // Utils
  MayfiEmbed: require('./structures/MayfiEmbed.js')
}