import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {

    // a medos de DI no usar static , como un agrupador
    static get routes(): Router {
        const controller = new AuthController(new AuthRepositoryImpl(new AuthDataSourceImpl()))

        const router = Router()
        // Cuando se tiene los mismos argumentos para enciar , en js se puede enviar como ref
        router.use('/login', controller.loginUser)
        router.post('/register', (req, res) => {
            controller.registerUser(req, res)
        })

        router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)
        return router
    }

}