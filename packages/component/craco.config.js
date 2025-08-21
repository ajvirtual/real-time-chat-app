const { cracoUnitTest } = require('@chat/config')

module.exports = cracoUnitTest({
    "@hooks": `hooks`,
    "@components": `components`,
    "@screen": `screen`,
    "@state": `state`,
    "@test": `test`,
}, __dirname, './src')
