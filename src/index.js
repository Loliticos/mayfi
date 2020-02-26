const CommandStructures = require('./structures/command/')

module.exports = {
  // Command Structures
  CommandStructures,
  Command: CommandStructures.Command,
  CommandContext: CommandStructures.CommandContext,
  CommandError: CommandStructures.CommandError,
  CommandRequirements: CommandStructures.CommandRequirements,

  // Loaders
  Loaders: require('./loaders/'),

  // Utils
  MayfiEmbed: require('./structures/MayfiEmbed.js'),
}
