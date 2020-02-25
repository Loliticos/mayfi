const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const chalk = require('chalk')

module.exports = class CommandLoader  {
    constructor(client) {
        this.client = client
    }

    load () {
        try {
            console.log(chalk.green("Commands are initializing"))
            this.client.commands = new Collection()
            this.client.alias = new Collection()
            this.initializeCommands()
            return true
        } catch (err) {
            console.error(err)
        }
    }
    
    initializeCommands () {
        console.log(this.client)
        let commandsCategory = readdirSync('src/commands')
        for (let category of commandsCategory) {
            let commandFile = readdirSync(`src/commands/${category}`)
            for (let name of commandFile) {
                console.log(name)
                const command = new(require(`src/commands/${category}/${name.split('.js')[0]}`)(this.client)
                this.client.commands.set(command.name, command)
                command.alias.forEach(a => this.client.alias.set(a, command.name))
            }
        }
        
    }

}