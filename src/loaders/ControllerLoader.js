const FileUtils = require("../utils/FileUtils.js")
const Controller = require("../structures/Controller.js")

module.exports = class CommandLoader  {
    constructor(client) {
        this.client = client

        this.controllers = {}
    }

    async load () {
        try {
            await this.initializeControllers()
            this.client.controllers = this.controllers

            return true
        } catch (err) {
            console.error(err)
        }
    }

    initializeControllers (dirPath = "src/controllers") {
        let success = 0
        let failed = 0
        return FileUtils.requireDirectory(dirPath, (NewController) => {
            this.addController(new NewController(this.client)) ? sucess++ : failed++
        }).then(() => {
            if (failed) console.log(`${sucess} controllers loaded, ${failed} failed.`)
            else console.log(`All ${sucess} controllers loaded without errors.`)
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