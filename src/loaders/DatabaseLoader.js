const mongoose = require("mongoose")
const Database = require("../database/MongoDB.js")

module.exports = class DatabaseLoader {
  constructor (client) {
    this.client = client

    this.database = null
  }

  async load () {
    try {
      await this.initializeDatabase(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      this.client.database = this.database
    } catch (e) {
      console.log(e)
    }
    return false
  }

  initializeDatabase (MONGODB_URI = process.env.MONGODB_URI, options = {}) {
    this.database = mongoose.connect(MONGODB_URI, options)
      .then((m) => {
        this.database = m
      })
  }
}