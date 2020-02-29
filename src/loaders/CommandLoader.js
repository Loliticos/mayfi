const { Collection } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = class CommandLoader  {
    constructor(client) {
        this.client = client
    }

    load () {
        try {
            console.log("Commands are initializing")
            this.client.commands = new Collection()
            this.client.aliases = new Collection()
            this.initializeCommands()
            return true
        } catch (err) {
            console.error(err)
        }
    }
    
    initializeCommands (dirPath = 'src/commands') {
        let commandsCategory = readdirSync(dirPath)
        for (let category of commandsCategory) {
            let commandFile = readdirSync(`${dirPath}/${category}`)
            for (let name of commandFile) {
                const command = new(require(`../commands/${category}/${name.split('.js')[0]}`))(this.client)
                this.client.commands.set(command.name, command)
                if(command.aliases) command.aliases.forEach(a => this.client.aliases.set(a, command.name))
            }
        }
        
    }

}