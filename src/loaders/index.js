// Automatic Import
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
const { readdirSync } = require('fs');

const files = readdirSync(__dirname)
files.remove('index.js')

let importado = {};

for (let file of files) {
    importado[file.replace(/.js/g, '')] = require(`./${file}`)
}
module.exports = importado