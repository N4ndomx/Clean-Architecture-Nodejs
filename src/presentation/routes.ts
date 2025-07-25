import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {

    // a medos de DI no usar static , como un agrupador
    static get routes(): Router {
        const router = Router()
        router.use('/api/auth', AuthRoutes.routes)
        return router
    }

}