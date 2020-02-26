const MayfiEmbed = require("../MayfiEmbed.js")
const Constants = require("../../utils/Data.js")

const CommandRequirements = require('./CommandRequirements')
const CommandError = require("./CommandError.js")

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

        this.run(context, args)
    }

    handleRequirements(context, args) {
        return this.requirements ? CommandRequirements.handle(context, this.requirements, args) : true
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