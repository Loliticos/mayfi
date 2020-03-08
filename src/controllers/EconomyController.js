const { Controller } = require('../')
const moment = require("moment")

class BonusCooldownError extends Error {
  constructor (lastMine, formattedCooldown) {
    super("ALREADY_CLAIMED")

    this.lastMine = lastMine
    this.formattedCooldown = formattedCooldown
  }
}
class BonusController extends Controller {
  constructor (client) {
    super({
      name: 'bonus'
    }, client)
  }

  get _users () {
    return this.client.database.users
  }

  async checkDaily (lastMine) {
    return Date.now() - lastMine < 43200000
  }

  formatDailyTime (lastMine) {
    return moment.duration(43200000 - (Date.now() - lastMine)).format('h[h] m[m] s[s]')
  }

  async claimDaily (_user) {
    const user = await this._users.findOne({_id: _user.id})
    const { lastMine } = user

    if (checkDaily(lastMine)) {
      throw new BonusCooldownError(lastMine, this.formatDailyTime(lastMine))
    }

    const gems = Math.floor(1 + Math.random() * (437 - 1))
    const fragments = Math.floor(1 + Math.random() * (72 - 1))

    await this._users.updateOne({_id: _user.id}, { $inc: { gems, fragments }, lastMine: Date.now() })

    return { gems, fragments }

  }
}

module.exports = class EconomyController extends Controller {
  constructor (client) {
    super({
      name: "economy"
    }, client)
    this.subcontrollers = [ new BonusController(this, client) ]
  }

  get _users () {
    return this.client.database.users
  }

  async transfer (_from, _to, amount) {
    const from = this._users.findOne({_id: _from.id})

    if (from.money < amount) throw new Error("NOT_ENOUGH_MONEY")

    const to = this._users.findOne({_id: _to.id})

    await Promise.all([
      this._users.updateOne({_id: _from.id}, { $inc: { money: -amount } }),
      this._users.updateOne({_id: _to.id}, { $inc: { money: amount } })
    ])

    return { fromMoney: from.money -amount, toMoney: to.money +amount }
  }

  async balance (_user) {
    const { gems, money, fragments, researchesPoints } = await this._users.findOne({ _id: _user.id })

    return { gems, money, fragments, researchesPoints }
  }

  async checkResearch (user) {
    if (user.gems < 10 || user.fragments < 15) return true
  }

  async research (_user) {
    const user = this._users.findOne({_id: _user.id})

    if (checkResearch(user)) throw new Error("INVALID_MATERIALS")

    const researchRDM = Math.floor(1 + Math.random() * (23 - 1))

    await this._users.updateOne({_id: _user.id}, { $inc: { gems: -10, fragments: -15, researchesPoints: researchRDM } })

    return researchRDM
  }
}