const { Controller } = require('../')

module.exports = class BlacklistController extends Controller {
  constructor (client) {
    super({
      name: "dev"
    }, client)
  }

  get _users () {
    return this.client.database.users
  }

  async blacklist (_user) {
    const user = await this._users.findOne({_id: _user.id})

    if (this.blacklisted(_user)) throw new Error("USER_ALREADY_BLACKLISTED")

    await this._users.updateOne({_id: _user.id}, { blacklisted: true })
  }

  async blacklisted (_user) {
    const user = this._users.findOne({_id: _user.id})

    return user.blacklisted ? true : false
  }

  async unblacklist (_user) {
    const user = this._users.findOne({_id: _user.id})

    if (!user.blacklisted) throw new Error("USER_NOT_BLACKLISTED")

    await this._users.updateOne({_id: _user.id}, { blacklisted: false })
  }
}
