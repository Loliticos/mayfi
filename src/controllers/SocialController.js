const { Controller } = require('../')

module.exports = class SocialController extends Controller {
  constructor (client) {
    super({
      name: "social"
    }, client)
  }

  get _users () {
    return this.client.database.users
  }
}
