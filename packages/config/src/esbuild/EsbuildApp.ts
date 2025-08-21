import { build } from 'esbuild'
import fs from 'fs-extra'
import postCssPlugin from 'esbuild-style-plugin'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'
import { copyPublicFolder, injectResultScript } from './EsbuildCopyAssets'
import { getDefine } from './EsbuildConfigUtils'

export const esbuildApp = async (dirname: string, options?: EsbuildAppOptions) => {
    const DEFINE = getDefine(dirname)
    const buildFolder = `${dirname}/${options?.buildFolder || 'build'}`
    const indexFile = `${dirname}/src/index.jsx`
    const buildHtmlFile = `${dirname}/build/index.html`

    if (fs.existsSync(buildFolder)) {
        await fs.rmdirSync(buildFolder, { recursive: true });
    }

    await copyPublicFolder(options?.buildFolder)
    await updateTemplateHtmlDelimiter(dirname)

    await build({
        entryPoints: [indexFile],
        outdir: buildFolder,
        minify: true,
        bundle: true,
        splitting: true,
        sourcemap: true,
        metafile: true, // needs to be set
        target: ['es6'],
        format: 'esm',
        platform: 'browser',
        entryNames: '[dir]/main-[hash]',
        loader: { ".svg": "dataurl", ".png": "dataurl", ".jpg": "dataurl" },
        plugins: [
            postCssPlugin({
                postcss: {
                    plugins: [require('tailwindcss'), require('autoprefixer')],
                },
            }),
            htmlPlugin({
                files: [
                    {
                        entryPoints: [indexFile],
                        filename: 'index.html',
                        htmlTemplate: buildHtmlFile,
                        define: Object.keys(DEFINE).reduce<Record<string, string>>((all, key) => {
                            all[key.replace('process.env.', '')] = JSON.parse(DEFINE[key])
                            return all
                        }, {})
                    },
                ]
            })
        ],
        define: DEFINE,
    }).catch(() => process.exit(1));

    await injectResultScript(options?.buildFolder)
};

const updateTemplateHtmlDelimiter = async (dirname: string) => {

    // Path to the original text file
    const htmlFile = `${dirname}/public/index.html`
    const buildHtmlFile = `${dirname}/build/index.html`

    return new Promise<void>((resolve, reject) => {
        // Read the contents of the original file
        fs.readFile(htmlFile, 'utf8', (err, data) => {
            if (err) {
                reject()
                return;
            }

            // Modify the contents as desired
            const modifiedContents = data.replace(/%(.*?)%/g, '<%- define.$1 %>');

            // Write the modified contents to the new file
            fs.writeFile(buildHtmlFile, modifiedContents, 'utf8', (err) => {
                if (err) {
                    reject()
                    return;
                }
                resolve()
            });
        });
    })
}

export type EsbuildAppOptions = {
    buildFolder?: string
}
