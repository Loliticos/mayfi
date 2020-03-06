const { Collection } = require('discord.js');
const fs = require('fs')
const path = require('path')
const FileUtils = require("../utils/FileUtils.js")

module.exports = class CommandLoader  {
    constructor(client) {
        this.client = client

        this.posLoadCommands = []
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
            this.addCommand(new NewCommand(this.client))
        }).then(() => {
            const sorted = this.posLoadCommands.sort((a, b) => +(typeof b === 'string') || -(typeof a === 'string') || a.length - b.length)
            sorted.forEach(subCommand => this.addSubcommand(subCommand))
        })
    }

    addCommand (command) {
        if (typeof command.parentCommand === 'string' || Array.isArray(command.parentCommand)) {
          this.posLoadCommands.push(command)
        } else {
            this.client.commands.set(command.name, command)
            if (command.aliases) command.aliases.forEach(a => this.client.aliases.set(a, command.name))
        }
    }

    addSubcommand (subCommand) {
        let parentCommand
        if(subCommand.parentCommand) {
            parentCommand = this.client.commands.get(subCommand.parentCommand)
        }

        if(parentCommand) {
            parentCommand.subcommands.push(subCommand)
            subCommand.parentCommand = parentCommand
            subCommand.hidden = true
        }
    }

}