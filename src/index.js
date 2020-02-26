const CommandStructures = require('structures/command/')

module.exports = {
  // Command Structures
  CommandStructures,
  Command: CommandStructures.Command,
  CommandContext: CommandStructures.CommandContext,
  CommandError: CommandStructures.CommandError,
  CommandRequirements: CommandStructures.CommandRequirements,

  // Utils
  MayfiEmbed: require('./structures/MayfiEmbed.js'),
}
