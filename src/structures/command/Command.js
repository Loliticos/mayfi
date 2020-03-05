const MayfiEmbed = require("../MayfiEmbed.js")
const Constants = require("../../utils/Constants.js")

const CommandRequirements = require('./CommandRequirements')
const CommandError = require("./CommandError.js")
const CommandParameters = require("./parameters/CommandParameter.js")

let Utils = require('../../utils')

module.exports = class Command {
    constructor(opts, client) {
        const options = Utils.createOptionHandler('Command', opts)
        this.name = options.required('name')
        this.aliases = options.optional('aliases')
        this.category = options.optional('category', 'general')
        this.hidden = options.optional('hidden', false)
        this.requirements = options.optional('requirements')
        this.parameters = options.optional('parameters')

        this.parentCommand = options.optional('parent')

        this.subcommands = []
        this.cooldown = opts.cooldown || 0
        this.cooldownMap = this.cooldown > 0 ? new Map() : null

        this.client = client

    }
    async _run (context, args) {
        try {
            this.handleRequirements(context, args)
        } catch(e) {
            return this.error(context, e)
        }

        const [ subcmd ] = args
        const subcommand = this.subcommands.find(c => c.name.toLowerCase() === subcmd || (c.aliases && c.aliases.includes(subcmd)))

        if (subcommand) {
            return subcommand._run(context, args.splice(1))
        }

        try {
          args = await this.handleParameters(context, args)
        } catch (e) {
          return this.error(context, e)
        }       

        this.applyCooldown(context.author)

        try {
          await this.run(context, ...args)
        } catch (e) {
          return this.error(context, e)
        }
    }

    setT (t) {
        return this.t = t;
    }

    handleRequirements(context, args) {
        return this.requirements ? CommandRequirements.handle(context, this.requirements, args) : true
    }

    get path() {
        return this.parentCommand ? `${this.parentCommand.name}.subcommands.${this.name}` : `${this.name}`
    }

    handleParameters(context, args) {
        return this.parameters ? CommandParameters.handle(context, this.parameters, args) : args
    }

    error ({ t, author, channel, prefix }, error) {
        if (error instanceof CommandError) {
          const embed = new MayfiEmbed(author)
            if(!error.showUsage) {
                embed.setTitle(t("commansd:errors.generic"))
                embed.setDescription(error.message)
            } else {
                embed
                  .setTitle(error.message)
                  .setDescription(error.showUsage ? this.usage(t, prefix) : '')
            }
            
          return channel.send(embed.setColor(Constants.ERROR_COLOR))
        }
        console.error(error)
    }

    applyCooldown (user) {
        console.log(this.cooldown)
        if (!this.cooldownMap) return
        if (!user || !this.cooldown > 0) return false
        if (this.cooldownMap.has(user.id)) return 

        this.cooldownMap.set(user.id, Date.now())
        setTimeout(() => this.cooldownMap.delete(user.id), this.cooldown * 1000)
        
    }

    usage(t, prefix, noUsage = true) {
        const usagePath = `${this.name}.commandUsage`
        const usage = noUsage ? t(`commands:${usagePath}`) : t([`commands:${usagePath}`, ''])
        if (usage !== usagePath) {
        return `**${t('commons:usage')}:** \`${prefix}${this.name} ${usage ? usage : ''}\``
        } else {
        return `**${t('commons:usage')}:** \`${prefix}${this.name}\``
        }
    }
    
    async run () {}

}