import { build, BuildOptions } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import { esbuildDecorators } from '@anatine/esbuild-decorators'

export const esbuildServer = (params: BuildOptions) => {
    return build({
        entryPoints: ['./src/index', './src/server'],
        outdir: './dist',
        bundle: true,
        plugins: [
            nodeExternalsPlugin({
                allowList: [
                ],
            }), 
            esbuildDecorators()
        ],
        banner: {},
        splitting: false,
        minify: false,
        sourcemap: false,
        keepNames: true,
        platform: 'node',
        format: 'cjs',
        loader: {
            '.ts': 'ts',
            '.tsx': 'tsx',
            '.css': 'css',
            '.png': 'base64',
            '.jpg': 'base64',
            '.gif': 'base64',
            '.svg': 'base64',
            '.node': 'file',
            '.doc': 'file',
            '.docx': 'file',
            '.xlsx': 'file',
        },
        ...params
    }).catch(() => process.exit(1))
}
