const { readdir } = require("fs")

module.exports = class ListenerLoader {
  constructor (client) {

    this.client = client

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
