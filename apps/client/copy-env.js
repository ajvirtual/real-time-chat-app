const fs = require('fs')

const srcFiles = [
    '../../.env',
    '../../.env.development',
    '../../.env.release',
    '../../.env.production',
    '../../.env.test'
]

const destFiles = [
    '.env',
    '.env.development',
    '.env.release',
    '.env.production',
    '.env.test'
]

srcFiles.forEach((item, index) => {
    // Copy file
    fs.copyFileSync(item, `build/${destFiles[index]}`);
})

