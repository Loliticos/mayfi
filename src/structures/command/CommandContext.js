module.exports = class CommandContext {
    constructor(options = {}) {
      this.client = options.client

      this.message = options.message
      this.author = options.message.author
      this.member = options.message.member
      this.channel = options.message.channel
      this.voiceChannel = options.message.member.voiceChannel ? options.message.member.voiceChannel : null
      this.guild = options.message.guild
      this.language = options.language
      this.command = options.command
      this.t = () => { throw new Error('Invalid FixedT') }
      this.prefix = options.prefix
    }

    setFixedT (translate) {
      this.t = translate
    }
}