const { readdirSync } = require("fs")
const { Collection } = require('discord.js');

module.exports = class ListenerLoader {
  constructor (client) {
    this.client = client
  }

  load () {
    try {
      console.log("Events are initializing")
      this.client.events = new Collection()
      this.initializeEvents()
      return true
    } catch (err) {
      console.error(err)
    }
  }

  initializeEvents () {
    let eventsFiles = readdirSync('src/listeners')
    for (let file of eventsFiles) {
        const event = new(require(`../listeners/${file}`))(this.client)
        this.client.events.set(event.name, event)
    }
    this.addListener()

  }

  addListener() {
    this.client.events.forEach(event => {
      this.client.on(event.name, (...args) => event.run(...args))
    });
  }
}
