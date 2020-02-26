const MayfiEmbed = require("../MayfiEmbed.js")
const { Constants } = require("../../")

const CommandRequirements = require('./CommandRequirements')
const CommandError = require("./CommandError.js")
const CommandParameters = require("./parameters/CommandParameter.js")

module.exports = class Command {
    constructor(client, options) {
        let {
            name,
            requirements = {},
            alias = [],
        } = options
        this.name = name
        this.requirements = requirements
        this.alias = alias
        this.hidden = false
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

        this.run(context, args)
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
        .setDescription(error.showUsage ? "usage" : '')
      return channel.send(embed.setColor(Constants.ERROR_COLOR)).then(() => channel.stopTyping())
    }
    console.error(error)
  }
    
    async run () {}

}