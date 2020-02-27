const MayfiEmbed = require("../MayfiEmbed.js")
const Constants = require("../../utils/Constants.js")

const CommandRequirements = require('./CommandRequirements')
const CommandError = require("./CommandError.js")
const CommandParameters = require("./parameters/CommandParameter.js")

let Utils = require('../../utils')

module.exports = class Command {
    constructor(client, opts) {
        const options = Utils.createOptionHandler('Command', opts)
        this.name = options.required('name')
        this.aliases = options.optional('aliases')
        this.category = options.optional('category', 'general')
        this.hidden = options.optional('hidden', false)
        this.requirements = options.optional('requirements')
        this.parameters = options.optional('parameters')

        this.client = client

    }
    async _run (context, args) {
        try {
            this.handleRequirements(context, args)
        } catch(e) {
            this.error(context, e)
        }

        try {
          await this.handleParameters(context, args)
        } catch (e) {
          return this.error(context, e)
        }

        try {
          await this.run(context, args)
        } catch (e) {
          this.error(context, e)
        }
    }

    setT (t) {
        return this.t = t;
    }

    handleRequirements(context, args) {
        return this.requirements ? CommandRequirements.handle(context, this.requirements, args) : true
    }

    handleParameters(context, args) {
        return this.parameters ? CommandParameters.handle(context, this.parameters, args) : args
    }

    error ({ t, author, channel, prefix }, error) {
    if (error instanceof CommandError) {
      const embed = new MayfiEmbed(author)
        .setTitle(error.message)
        .setDescription(error.showUsage ? this.usage(t, prefix) : '')
      return channel.send(embed.setColor(Constants.ERROR_COLOR)).then(() => channel.stopTyping())
    }
    console.error(error)
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