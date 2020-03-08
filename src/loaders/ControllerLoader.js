const FileUtils = require("../utils/FileUtils.js")
const Controller = require("../structures/Controller.js")

module.exports = class CommandLoader  {
    constructor(client) {
        this.client = client

        this.controllers = {}
    }

    async load () {
        try {
            console.log("Initializing controllers")
            await this.initializeControllers()
            this.client.controllers = this.controllers

            return true
        } catch (err) {
            console.error(err)
        }
    }

    initializeControllers (dirPath = "src/controllers") {
        return FileUtils.requireDirectory(dirPath, (NewController) => {
            this.addController(new NewController(this.client))
        }).then(() => {
            console.log("Controllers has been initialized")
        })
    }

    addController (controller) {
        if (!(controller instanceof Controller)) {
            return console.log(`Controller ${controller.name} is not a instance of Controller`)
        }

        this.controllers[controller.name] = controller.load()
        return true
    }
}