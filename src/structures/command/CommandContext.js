module.exports = class CommandContext {
    constructor(client, options = {}) {
        this.client = client

        this.message = options.message
        this.author = options.message.author
        this.member = options.message.member
        this.channel = options.message.channel
        this.voiceChannel = options.message.member.voiceChannel ? options.message.member.voiceChannel : null
        this.guild = options.message.guild
        this.language = options.language
        this.command = options.command
        this.aliase = options.aliase
        this.prefix = options.prefix
        this.t = () => { throw new Error("Invalid t") }
    }

    setFixedT (translate) {
        this.t = translate
    }
}