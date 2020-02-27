
const CommandStructures = require('./structures/command/')

module.exports = {
  // Command Structures
  CommandStructures,
  Command: CommandStructures.Command,
  CommandContext: CommandStructures.CommandContext,
  CommandError: CommandStructures.CommandError,
  CommandParameter: CommandStructures.CommandParameter,
  CommandRequirements: CommandStructures.CommandRequirements,
  Parameter: CommandStructures.Parameter,

  // Loaders
  CommandLoader: require('./loaders/CommandLoader.js'),
  ListenerLoader: require("./loaders/ListenerLoader.js"),
  LocaleLoader: require("./loaders/LocaleLoader.js"),
  DatabaseLoader: require("./DatabaseLoader.js"),

  // Utils
  Constants: require("./utils/Constants.js"),
  Permissions: require("./utils/Permissions.js"),

  // Structures
  EventHandler: require("./structures/EventHandler.js"),
  MayfiEmbed: require('./structures/MayfiEmbed.js')
}