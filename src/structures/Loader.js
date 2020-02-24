module.exports = class Loader {
  /**
   * @param {Object} opts
   * @param {boolean} [opts.critical]
   * @param {Client} client
   */
  constructor (opts, client) {

    this.client = client
  }

  load (client) {
    return true
  }

  log (...args) {
    return this.client.log(...args)
  }

  logError (...args) {
    return this.client.logError(...args)
  }
}
