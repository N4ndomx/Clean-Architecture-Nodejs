import mongoose from "mongoose"

interface Opcions{
    mongoUrl:string
    dbName:string
}

export class MongoDataBase{
    static async connect(opcions:Opcions){
        const {mongoUrl,dbName} = opcions
        try {
            await mongoose.connect(mongoUrl,{
                dbName:dbName
            })
            console.log('Mongo Connected');
            
            return true
        } catch (error) {
            console.log('Mongo connection error')
            throw error
        }
    }
}