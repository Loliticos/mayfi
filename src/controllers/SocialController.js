const { Controller } = require('../')
const moment = require("moment")

class RepCooldown extends Error {
  constructor (lastRep, formattedCooldown) {
    super("ALREADY_REPPED")

    this.lastRep = lastRep
    this.formattedCooldown = formattedCooldown
  }
}

module.exports = class SocialController extends Controller {
  constructor (client) {
    super({
      name: "social"
    }, client)
  }

  get _users () {
    return this.client.database.users
  }

  formatRepTime (lastRep) {

  }

  async checkRep (_user, lastRep) {

  }

  async giveRep (_from, _to) {

  }

  async getReps (_user) {
    
  }

  async marry (_requester, _requested) {

  }

  async personalTextChange (_user, text) {

  }

  async personalText (_user) {

  }

  async leaderboard (value, size) {

  }

}
