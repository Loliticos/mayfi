const Parameter = require('./Parameter.js')
const CommandError = require('../../CommandError.js')
const PermissionUtils = require('../../../../utils/Permissions.js')
const MayfiEmbed = require("../../../../structures/MayfiEmbed.js")

const MENTION_REGEX = /^(?:<@!?)?([0-9]{16,18})(?:>)?$/
const defVal = (o, k, d) => typeof o[k] === 'undefined' ? d : o[k]

module.exports = class UserParameter extends Parameter {
  static parseOptions (options = {}) {
    return {
      ...super.parseOptions(options),
      acceptBot: !!options.acceptBot,
      acceptUser: defVal(options, 'acceptUser', true),
      acceptDeveloper: defVal(options, 'acceptDeveloper', true),
      acceptSelf: !!options.acceptSelf,
      errors: {
        invalidUser: 'errors:invalidUser',
        acceptSelf: 'errors:sameUser',
        acceptBot: 'errors:invalidUserBot',
        acceptUser: 'errors:invalidUserNotBot',
        acceptDeveloper: 'errors:userCantBeDeveloper',
        ...(options.errors || {})
      }
    }
  }

  static async parse (arg, { t, client, author, guild, channel }) {
    if (!arg) return
    const regexResult = MENTION_REGEX.exec(arg)
    const id = regexResult && regexResult[1]
    const findMember = guild.members.find(m => m.user.username.toLowerCase().includes(arg.toLowerCase()) || m.displayName.toLowerCase().includes(arg.toLowerCase()))

    const user = client.users.get(id) || (!!findMember && findMember.user)
    if (!user) throw new CommandError(t(this.errors.invalidUser))
    if (!this.acceptSelf && user.id === author.id) throw new CommandError(t(this.errors.acceptSelf))
    if (!this.acceptBot && user.bot) throw new CommandError(t(this.errors.acceptBot))
    if (!this.acceptUser && !user.bot) throw new CommandError(t(this.errors.acceptUser))
    if (!this.acceptDeveloper && PermissionUtils.isDev(client, user)) throw new CommandError(t(this.errors.acceptDeveloper), false)
   
    const userData = await client.database.users.findOne({_id: user.id})

    if (!userData) {
      const newUser = new client.database.users({
        _id: user.id
      })

      newUser.save()

      const embed = new MayfiEmbed(author)
      .setTitle(t("errors:generic"))
      .setDescription(t("commands:rep.typeAgain"))
          
      return channel.send({embed})
    }
    
    return user
  }
}
