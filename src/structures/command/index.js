module.exports = {
  Command: require('./Command.js'),
  CommandContext: require('./CommandContext.js'),
  CommandError: require('./CommandError.js'),
  CommandParameter: require('./parameters/CommandParameter.js'),
  CommandRequirements: require('./CommandRequirements.js'),

  // Parameters
  Parameter: require('./parameters/types/Parameter.js'),
  MemberParameter: require('./parameters/types/MemberParameter.js'),
  StringParameter: require('./parameters/types/StringParameter.js'),
  UserParameter: require('./parameters/types/UserParameter.js'),
  GuildParameter: require('./parameters/types/GuildParameter.js'),
  ChannelParameter: require('./parameters/types/ChannelParameter.js'),
  EmojiParameter: require('./parameters/types/EmojiParameter.js'),
  NumberParameter: require('./parameters/types/NumberParameter.js'),
  RoleParameter: require('./parameters/types/RoleParameter.js'),
  TimeParameter: require('./parameters/types/TimeParameter.js')
}
