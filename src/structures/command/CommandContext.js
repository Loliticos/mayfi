module.exports = class CommandContext {
    constructor(client, options) {
        this.client = client;
        this.message = options.message;
        this.guild = options.message.guild ? options.message.guild : null;
        this.prefix = options.prefix;
        this.channel = options.message.channel;
        this.member = options.message.guild ? options.message.member : null;
        this.voice = options.message.guild ? options.message.member.voice : null;
        this.author = options.message.author;
        this.args = options.message.content.substring(2).split(/[ \t]+/).filter(a => a).slice(1)
        this.t = options.t
    }
}