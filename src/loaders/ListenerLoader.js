const { readdir } = require("fs")
const Loader = require("../structures/loader")

module.exports = class ListenerLoader extends Loader {
  constructor (client) {

    this.listeners = ["ready"]

  }

  async load() {
    readdir("../src/listeners/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
          const event = require(`../src/listeners/${file}`);
          let eventName = file.split(".")[0];
          this.client.on(eventName, event.bind(null, client));
      })
    })
  }
}
