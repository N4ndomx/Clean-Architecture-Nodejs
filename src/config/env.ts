import { from, get } from 'env-var';
import { loadEnvFile } from 'node:process'
loadEnvFile()
export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asUrlString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString()

}