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
            this.client.commands = new Collection();
            this.client.alias = new Collection();
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
                const command = new(require(`${dirPath}/${category}/${name}`))(this.client)
                this.client.commands.set(command.name, command)
                command.alias.forEach(a => this.client.alias.set(a, command.name))
            }
        }
        
    }

}