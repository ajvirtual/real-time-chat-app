const { tailwindcss } = require('@chat/config/dist/tailwindcss')

module.exports = {
    ...tailwindcss,
    corePlugins: {
        preflight: true,
    }
}
