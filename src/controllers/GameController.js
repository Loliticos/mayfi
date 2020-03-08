const { Controller } = require('../')

module.exports = class GameController extends Controller {
  constructor (client) {
    super({
      name: "game"
    }, client)
  }

  get _users () {
    return this.client.database.users
  }

  checkMoney (_user, amount) {
    const user = this._users.findOne({_id: _user.id})

    if (user.money < amount) throw new Error("NOT_ENOUGH_MONEY")
  }

  async betflip (_user, amount, side) {
    const user = this._users.findOne({ id: _user.id })

    this.checkMoney(_user, amount)

    const choosenSide = Math.random() > 0.5 ? 'heads' : 'tails'

    const won = choosenSide === side ? true : false

    const bet = won ? amount : -amount

    await this._users.updateOne({ _id: _user.id }, { $inc: { money: bet } })

    return { choosenSide, won }
  }
}
