import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from './env';

// Para generar nuestras serr podemos usar openssl
// openssl rand -hex 32 ---Linux
const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {
    static async generateToken(payload: Object, duration: string = '2h'): Promise<string | null> {
        // jwt trabaja con callbacks pero lo ajustamos para promise
        return new Promise((resolve) => {
            // TODO: generacion de la seed
            jwt.sign(payload, JWT_SEED, { expiresIn: duration as SignOptions['expiresIn'] }, (err, token) => {
                if (err) return resolve(null)
                resolve(token!)
            })
        })

    }
    // Arreglado de tipado 
    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null)
                resolve(decoded as T)
            })
        })
    }
}