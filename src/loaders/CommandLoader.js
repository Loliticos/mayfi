const { Collection } = require('discord.js');
const fs = require('fs')
const path = require('path')
const FileUtils = require("../utils/FileUtils.js")

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

    initializeCommands (dirPath = "src/commands") {
        return FileUtils.requireDirectory(dirPath, (NewCommand) => {
            const command = new NewCommand(this.client)
            if(command.parentCommand) return this.addSubcommand(command)
            this.client.commands.set(command.name, command)
            if (command.aliases) command.aliases.forEach(a => this.client.aliases.set(a, command.name))
        })
    }

    addSubcommand (subCommand) {
        console.log(subCommand)
        let parentCommand
        if(subCommand.parentCommand) {
            parentCommand = this.client.commands.get(subCommand.parentCommand)
        }

        console.log(parentCommand)

        if(parentCommand) {
            parentCommand.subcommands.push(subCommand)
            subCommand.parentCommand = parentCommand
            subCommand.hidden = true
        }
    }

}