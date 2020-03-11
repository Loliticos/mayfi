const { Controller } = require('../')
const moment = require("moment")

class RepCooldownError extends Error {
  constructor (lastRep, formattedCooldown) {
    super("ALREADY_REP")

    this.lastRep = lastRep
    this.formattedCooldown = formattedCooldown
  }
}

class MarryController extends Controller {
  constructor (parent, client) {
    super({
      name: "marry",
      parent
    }, client)
  }

  async marry (_requester, _requested) {

  }

  async divorce (_divorcer, _requested) {

  }
}

module.exports = class SocialController extends Controller {
  constructor (client) {
    super({
      name: "social"
    }, client)
    this.subcontrollers = [ new MarryController(this, client) ]
  }

  get _users () {
    return this.client.database.users
  }

  formatRepTime (lastRep) {
    return moment.duration(86400000 - (Date.now() - lastRep)).format("h[h] m[m] s[s]")
  }

  async checkRep (lastRep) {
    return Date.now() - lastRep < 86400000
  }

  async rep (_from, _to) {
    const { lastRep } = await this._users.findOne({_id: _from.id})

    if (checkRep(lastRep)) throw new RepCooldownError(lastRep, this.formatRepTime(lastRep))

    await Promise.all([
      this._users.updateOne({_id: _from.id}, { lastRep: Date.now() }),
      this._users.updateOne({_id: _to.id}, { $inc: { reps: 1 } })
    ])
  }

  async getReps (_user) {
    const { reps } = await this._users.findOne({_id: _user.id})

    return reps
  }

  async personalTextChange (_user, text) {
    await this._users.updateOne({_id: _user.id}, { personalText: text })
  }

  async personalText (_user) {
    return await this._users.findOne({_id: _user})
  }

  async leaderboard (value, size = 5) {

    const databaseResult = await this._users.find({}, value).sort({ [value]: -1 }).limit(size + 6)

    const top = databaseResult.filter(u => {
      u.user = this.client.users.get(u._id)
      return !!u.user
    })

    return top.splice(0, size)

  }

}