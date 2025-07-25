import { envs } from "./config"
import { MongoDataBase } from "./data/mongodb"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

// funcion anonima autoinvocada 
(() => {
    main()
})()


async function main() {
    // TODO: await de bd 
    await MongoDataBase.connect({
        dbName:envs.MONGO_DB_NAME,
        mongoUrl:envs.MONGO_URL
    })

    // TODO: init server
    new Server({
        PORT: envs.PORT,
        routes: AppRoutes.routes
    }).start()


}