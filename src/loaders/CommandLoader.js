const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const chalk = require('chalk')

module.exports = class EventLoader  {
    constructor(client) {
        this.client = client
    }

    load () {
        try {
            console.log(chalk.green("Commands are initializing"))
            this.client.commands = new Collection();
            this.client.alias = new Collection();
            this.initializeCommands()
            return true
        } catch (err) {
            console.error(err)
        }
    }
    
    initializeCommands () {
        let commandsCategory = readdirSync('src/commands')
        for (let category of commandsCategory) {
            let commandFile = readdirSync(`src/commands/${category}`)
            for (let name of commandFile) {
                const command = new(require('../commands/'+category+'/'+name.split('.js')[0]))(this.client)
                this.client.commands.set(command.name, command)
                command.alias.forEach(a => this.client.alias.set(a, command.name))
            }
        }
        
    }

}