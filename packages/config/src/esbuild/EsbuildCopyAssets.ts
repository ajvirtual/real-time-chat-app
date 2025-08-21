import * as cheerio from 'cheerio'
import fs from 'fs-extra'

export const copyPublicFolder = (buildFolder?: string) => {
    return new Promise<void>((resolve, reject) => {
        fs.copy('./public', buildFolder ?? './build', (err) => {
            if (err) {
                return reject(err)
            };
            resolve()
        });
    })
}

const getMainFileName = (buildFolder?: string) => {
    return new Promise<{ mainJs?: string, mainCss?: string }>((resolve, reject) => {
        fs.readdir(`./${buildFolder || 'build'}`, (err, files) => {
            if (err) {
                reject(err)
                return;
            }

            const mainJs = files.find((item) => /^main/.test(item) && item.endsWith('.js'))
            const mainCss = files.find((item) => /^main/.test(item) && item.endsWith('.css'))
            resolve({ mainJs, mainCss })
        });
    })
}

export const injectResultScript = (buildFolder?: string) => {
    return new Promise((resolve, reject) => {
        const indexFile = `./${buildFolder || 'build'}/index.html`
        fs.readFile(indexFile, 'utf8', async (err, html) => {
            if (err) {
                reject(err)
                return;
            }

            // Load the HTML into cheerio
            const $ = cheerio.load(html);

            const { mainJs, mainCss } = await getMainFileName(buildFolder)

            // Inject the script tag into the HTML
            $('head').append(`<script type="module" src="/${mainJs}"></script>`);
            $('head').append(`<link rel="stylesheet" type="text/css"  href="/${mainCss}">`);

            // Get the modified HTML
            const modifiedHTML = $.html();
            fs.writeFile(indexFile, modifiedHTML, (err) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(modifiedHTML)
            })
        });
    })
}
