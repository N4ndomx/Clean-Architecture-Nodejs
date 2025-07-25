import express, { Router } from 'express'
interface Options {
    PORT: number
    routes: Router
}


export class Server {
    readonly app = express()

    private readonly PORT: number
    readonly routes: Router

    constructor(
        options: Options
    ) {
        const { PORT = 8080, routes } = options
        this.PORT = PORT
        this.routes = routes
    }


    async start() {
        //Middlewares - funciones que se ejecutan antes de otras funciones
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true })) // x-www



        // Uso de rutas definidas
        this.app.use(this.routes)


        this.app.listen(this.PORT, () => {
            console.log(`Server running on port:${this.PORT}`)
        })
    }


}