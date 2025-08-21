
const path = require("path");

const getAlias = (alias: Record<string, string>, prefix = "src") => {
    return Object.keys((alias)).reduce((all: Record<string, string>, key: string) => {
        const value = alias[key]
        all[key] = `${prefix}/${value.replace(/^\//, '')}`
        return all
    }, {})
};



export const cracoUnitTest = (alias: Record<string, string>, dirname: string, src: string = './src') => {
    const aliases = getAlias(alias, src);
    const resolvedAliases = Object.fromEntries(
        Object.entries(aliases).map(([key, value]) => [
            Object.entries(getAlias(alias, "./src")).map(([key, value]) => [
                key,
                path.resolve(dirname, value),
            ])
        ])
    );

    const resolvedJestAliases = Object.fromEntries(
        Object.entries(getAlias(alias, "<rootDir>/src")).map(([key, value]) => [
            `^${key}/(.*)$`,
            `${value}/$1`,
        ])
    );
    return {
        webpack: {
            alias: resolvedAliases,
        },
        jest: {
            configure: {
                verbose: true,
                moduleNameMapper: resolvedJestAliases
            }
        }
    }
}

