import dotEnv from 'dotenv';

let envs = process.env
try {
    const result = dotEnv.config({ path: `../../.env.${process.env.NODE_ENV}` });
    if (result.error) throw result.error;
    envs = result.parsed
} catch (e) {
    console.log(`[DOTENV] file not found for "../../.env.${process.env.NODE_ENV}"`)
}

export const ENV: Record<string, string> = {
    ...envs,
    PORT: envs.SERVER_PORT || process.env.SERVER_PORT,
    SECURE: envs.SECURE,
    DB_TYPE: envs.DB_TYPE || 'mysql',
    DB_HOST: envs.DB_HOST || '127.0.0.1',
    DB_PORT: envs.DB_PORT || '3306',
    DB_NAME: envs.DB_NAME,
    DB_USER: envs.DB_USER,
    DB_PASSWORD: envs.DB_PASSWORD,
    DB_DIALECT: envs.DB_DIALECT || 'mysql',

    JWT_ENCRYPTION: envs.JWT_ENCRYPTION || 'secureKey',
    JWT_EXPIRATION: envs.JWT_EXPIRATION || '1y',
    ...process.env
};
