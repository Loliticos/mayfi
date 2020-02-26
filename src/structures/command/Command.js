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
    async _run (ctx, args) {
        try {
            this.handleRequirements(ctx, args)
        } catch(e) {
            this.error(ctx, e)

        }
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