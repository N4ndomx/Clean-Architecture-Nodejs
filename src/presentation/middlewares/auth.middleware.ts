import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {

    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header('Authorization')

        if (!authorization) return res.status(401).json({ error: 'No token provided' })

        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' })
        const token = authorization.split(' ')[1] || ''

        try {

            const palyload = await JwtAdapter.validateToken<{ id: string }>(token)
            // console.log(palyload)
            if (!palyload) return res.status(401).json({ error: 'Invalid token' })

            //debe 
            const user = await UserModel.findById(palyload.id)
            // No se debe responder 
            if (!user) return res.status(500)

            next()
        } catch (error) {
            console.error(error)
            res.status(500)
        }

    }
}