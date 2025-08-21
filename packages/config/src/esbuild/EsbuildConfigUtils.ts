
import dotEnv from 'dotenv'

const nodeEnv = process.env.NODE_ENV || 'development'

export const getProcessEnv = (dirname: string) => {
    const globalResult = dotEnv.config({ path: `${__dirname}/../../../../.env.${nodeEnv}` });
    const localResult = dotEnv.config({ path: `${dirname}/.env.${nodeEnv}` });
    if (globalResult.error) throw globalResult.error;
    if (localResult.error) throw localResult.error;
    const { parsed: globalEnvs } = globalResult;
    const { parsed: localEnvs } = localResult;
    return {...globalEnvs, ...localEnvs}
}

export const getDefine = (dirname: string): Record<string, string> => {
    const env = getProcessEnv(dirname)
    
    return Object.keys(env).filter((key) => key !== 'NODE_ENV').reduce((all, key) => {
        return {
            ...all,
            [`process.env.${key}`]: JSON.stringify(env[key])
        }
    }, {
        [`process.env`]: "{}"
    })
}

