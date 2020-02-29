const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const chalk = require('chalk')
const { FileUtils } = require("../")

module.exports = class CommandLoader  {
    constructor(client) {
        this.client = client

        this.commands = []
        this.posLoadCommands = []
    }

    async load () {
        try {
            await this.initializeCommands()
            this.client.commands = this.commands
            return true
        } catch (err) {
             this.logError(err)
        }
    }

  initializeCommands (dirPath = 'src/commands') {
    let success = 0
    let failed = 0
    return FileUtils.requireDirectory(dirPath, (NewCommand) => {
      this.addCommand(new NewCommand(this.client)) ? success++ : failed++
    }, this.logError.bind(this)).then(() => {
      const sorted = this.posLoadCommands.sort((a, b) => +(typeof b === 'string') || -(typeof a === 'string') || a.length - b.length)
      sorted.forEach(subCommand => this.addSubcommand(subCommand))
      if (failed) console.log(`${success} commands loaded, ${failed} failed.`, { color: 'yellow', tags: ['Commands'] })
      else console.log(`All ${success} commands loaded without errors.`, { color: 'green', tags: ['Commands'] })
    })
  }

  /**
   * Adds a new command to the Client.
   * @param {Command} command - Command to be added
   */
  addCommand (command) {
    if (typeof command.parentCommand === 'string' || Array.isArray(command.parentCommand)) {
      this.posLoadCommands.push(command)
    } else {
      const check = this.checkCommand(command)
      if (!check) return check
      this.commands.push(command)
    }

    return true
  }

  addSubcommand (subCommand) {
    let parentCommand
    if (typeof subCommand.parentCommand === 'string') {
      parentCommand = this.commands.find(c => c.name === subCommand.parentCommand)
    } else if (Array.isArray(subCommand.parentCommand)) {
      parentCommand = subCommand.parentCommand.reduce((o, ca) => {
        const arr = (Array.isArray(o) && o) || (o && o.subcommands)
        if (!arr) return
        return arr.find(c => c.name === ca)
      }, this.commands)
    }

    if (parentCommand) {
      parentCommand.subcommands.push(subCommand)
      subCommand.parentCommand = parentCommand
      if (subCommand.category === 'general') subCommand.category = parentCommand.category
    } else {
      parentCommand = subCommand.parentCommand
      const name = (Array.isArray(parentCommand) ? parentCommand : [ parentCommand ]).concat([ subCommand.name ]).join(' ')
      console.log(`[Commands] ${name} failed to load - Couldn't find parent command.`)
      return false
    }

    const check = this.checkCommand(subCommand)
    return check
  }

  checkCommand (command) {
    if (!(command instanceof Command)) {
      console.log(`[Commands] ${command} failed to load - Not a command`)
      return false
    }

    if (command.canLoad() !== true) {
      console.log(`[Commands] ${command.fullName} failed to load - ${command.canLoad() || 'canLoad function did not return true.'}`)
      return false
    }

    if (command.requirements) {
      if (command.requirements.apis && !command.requirements.apis.every(api => {
        if (!this.client.apis[api]) console.log(`[Commands] ${command.fullName} failed to load - Required API wrapper "${api}" not found.`)
        return !!this.client.apis[api]
      })) return false

      if (command.requirements.envVars && !command.requirements.envVars.every(variable => {
        if (!process.env[variable]) console.log(`[Commands] ${command.fullName} failed to load - Required environment variable "${variable}" is not set.`)
        return !!process.env[variable]
      })) return false

      if (command.requirements.canvasOnly && !this.client.canvasLoaded) {
        console.log(`[Commands] ${command.fullName} failed to load - Canvas is not installed.`)
        return false
      }
    }

    return true
  }

}