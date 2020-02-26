const { EventHandler, CommandContext }  = require('../')
const i18next = require('i18next')

module.exports = class ClientOnMessage extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }

    run(message) {
        let prefix = message.channel.type === "dm" ? '' : 'mc!'

        if (message.author.bot) return

        let args = message.content.slice(prefix.length).trim().split(/ /g)
        let commandname = args.shift().toLowerCase()
        let command = this.client.commands.get(commandname) || this.client.commands.get(this.client.alias.get(commandname))

        if(!command) return

        const t = i18next.getFixedT('pt-BR')

        const context = new CommandContext({ 
            client: this.client,
            message,
            command,
            t
        })

        console.log(`[Commands] "${message.content}" (${command.constructor.name}) ran by "${message.author.tag}" (${message.author.id}) on guild "${message.guild.name}" (${message.guild.id}) channel "#${message.channel.name}" (${message.channel.id})`)
        this.client.runCommand(command, context, args)
    }
}
