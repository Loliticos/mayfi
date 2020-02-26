const { EventHandler, CommandContext }  = require('../')
const i18next = require('i18next')

module.exports = class ClientOnMessage extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }

    run(message) {
        let prefix = message.channel.type === "dm" ? '' : 'mc!'

        if (message.author.bot) return

        const mc = (...m) => m.some(st => message.content.startsWith(st))
        const usedPrefix = mc(this.client.user.toString(), `<@!${this.client.user.id}>`) ? `${botMention} ` : mc(prefix) ? prefix : null
        
        const language = "pt-BR"

        if(usedPrefix) {
            const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => !prefix || a)
            const args = fullCmd.slice(1)
            if (!fullCmd.length) return
            const cmd = this.client.commands.get(commandname) || this.client.commands.get(this.client.alias.get(commandname))
            if (command) {
                let commandctx = new CommandContext(this.client, { 
                    aliase: cmd,
                    client: this.client,
                    prefix,
                    message,
                    command,
                    language
                })

                console.log(`"${message.content}" (${command.constructor.name}) ran by "${message.author.tag}" (${message.author.id}) on guild "${message.guild.name}" (${message.guild.id}) channel "#${message.channel.name}" (${message.channel.id})`, { color: 'magenta', tags: ['Commands'] })
                this.client.runCommand(command, context, args, language)
            }
        }
    }
}
