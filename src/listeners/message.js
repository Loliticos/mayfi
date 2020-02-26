const { EventHandler, CommandContext } = require('../');
const i18next = require('i18next')

module.exports = class ClientOnMessage extends EventHandler {
    constructor(client) {
        super(client, 'message')
    }

    run(message) {
        let prefix = message.channel.type === "dm" ? '' : 'mc!'

        if (message.author.bot || !message.content.startsWith(prefix)) return
        
        let args = message.content.slice(prefix.length).trim().split(/ /g)
        let commandname = args.shift().toLowerCase()
        let cmd = this.client.commands.get(commandname) || this.client.commands.get(this.client.alias.get(commandname))
        
        let t;
        const setFixedT = function (translate) { t = translate }
        setFixedT(i18next.getFixedT('pt-BR'))

        let commandctx = new CommandContext(this.client, { 
            message,
            prefix,
            t
        })

        cmd._execute(commandctx, args)
    }
};
