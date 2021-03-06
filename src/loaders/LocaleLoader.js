const { readdirSync } = require('fs');
const i18next = require('i18next');
const translationBackend = require('i18next-node-fs-backend');

module.exports = class EventLoader  {
    constructor(client) {
        this.client = client
    }

    load () {
        try {
            console.log("Locales are initializing")
            this.initializeLocales()
            this.client.i18next = i18next
            return true
        } catch (err) {
            console.error(err)
        }
    }
    
    async initializeLocales () {
      try {
          i18next.use(translationBackend).init({
              ns: ['commands', 'events', 'permissions', 'commons', 'categories', 'errors', 'regions'],
              preload: await readdirSync('./src/locales/'),
              fallbackLng: 'en-US',
              backend: {
                  loadPath: `src/locales/{{lng}}/{{ns}}.json`
              },
              interpolation: {
                  escapeValue: false
              },
              returnEmptyString: false
          })

        } catch(err) {
            console.error(err)
        }
    }

}