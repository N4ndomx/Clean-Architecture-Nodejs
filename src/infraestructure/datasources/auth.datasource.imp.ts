// Pude ser llamado oracel.auth.datasource.ts 
// SI tiene varias implememntaciones 

import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDTO, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFuncion = (password: string) => string
type CompareFunction = (password: string, hash: string) => boolean

export class AuthDataSourceImpl implements AuthDataSource {

    // funcion como dependecia 
    constructor(
        private readonly hashPassword: HashFuncion = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) { }

    async register(registerUserDto: RegisterUserDTO): Promise<UserEntity> {
        const { name, email, password } = registerUserDto

        try {
            // 1.Verificar si el correo existe 
            const emailExists = await UserModel.findOne({
                email: email
            })
            // No indicar que el usurio exista explo vulnerabilidad -- Error Generico 
            if (emailExists) throw CustomError.badRequest('User already exists')

            // 2.Hash de constraseña

            const user = await UserModel.create({
                email,
                name,
                password: this.hashPassword(password)
            })

            await user.save()


            // 3.Mapear la respuesta a entidad
            //TODO: Falta un mapper

            return UserMapper.userEntityFromObject(user)

        } catch (error) {
            // SI dispara un error puede ser nuestro personalido nuestro o ajeno 
            console.log(error)
            if (error instanceof CustomError) throw error

            throw CustomError.internalServer()


        }

    }

    async getUsers(): Promise<UserEntity[]> {
        const data = await UserModel.find()
            .then(
                users => users.map(user => UserMapper.userEntityFromObject(user))
            )
        return data
    }

}