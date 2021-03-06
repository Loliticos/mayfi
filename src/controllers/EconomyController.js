const { Controller } = require('../')
const moment = require("moment")

class BonusCooldownError extends Error {
  constructor (lastMine, formattedCooldown) {
    super("ALREADY_CLAIMED")

    this.lastMine = lastMine
    this.formattedCooldown = formattedCooldown
  }
}

class ResearchError extends Error {
  constructor (information) {
    super("INVALID_MATERIALS")

    this.required = information.required
    this.gems = information.gems
    this.fragments = information.gems
  }
}

class BonusController extends Controller {
  constructor (parent, client) {
    super({
      name: "bonus",
      parent
    }, client)
  }

  get _users () {
    return this.client.database.users
  }

  checkDaily (lastMine) {
    return Date.now() - lastMine < 21600000
  }

  formatDailyTime (lastMine) {
    return moment.duration(21600000 - (Date.now() - lastMine)).format('h[h] m[m] s[s]')
  }
  async claimDaily (_user) {
    const user = await this._users.findOne({_id: _user.id})
    const { lastMine } = user

    if (this.checkDaily(lastMine)) {
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
    const from = await this._users.findOne({_id: _from.id})

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

  async betflip (_user, amount, side) {
    const user = await this._users.findOne({ _id: _user.id })

    if (user.money < amount) throw new Error("NOT_ENOUGH_MONEY")

    const choosenSide = Math.random() > 0.5 ? 'heads' : 'tails'

    const won = choosenSide === side ? true : false

    const bet = won ? amount : -amount

    await this._users.updateOne({ _id: _user.id }, { $inc: { money: bet } })

    return { choosenSide, won }
  }


  async research (_user, toRepeat = 1) {
    const user = await this._users.findOne({_id: _user.id})

    const gemsCheck = user.gems < 10 * toRepeat
    const fragmentsCheck = user.fragments < 15 * toRepeat

    if (gemsCheck || fragmentsCheck) throw new ResearchError({toRepeat, gems: user.gems, fragments: user.fragments})

    const researchRDM = Math.floor(1 + Math.random() * (23 * toRepeat - 1))

    await this._users.updateOne({_id: _user.id}, { $inc: { gems: -10 * toRepeat, fragments: -15 * toRepeat, researchesPoints: researchRDM } })

    return researchRDM
  }
}
