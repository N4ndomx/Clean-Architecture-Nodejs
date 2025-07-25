// Mndarlo a llamr para que haga una tarea espesifi

import { JwtAdapter } from "../../../config";
import { RegisterUserDTO } from "../../dto/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface RegisterUserCase {
    execute(registerDto: RegisterUserDTO): Promise<UserToken>
}

interface UserToken {
    token: string,
    user: {
        id: string,
        name: string
    }
}

type SignFuntion = (payload: Object, duration?: string) => Promise<string | null>


export class RegisterUser implements RegisterUserCase {
    constructor(
        private readonly authRepository: AuthRepository,
        // Si no la propirciona usa JWT
        private readonly signToken: SignFuntion = JwtAdapter.generateToken

    ) { }
    async execute(registerDto: RegisterUserDTO): Promise<UserToken> {
        // Crear Usuario 
        const user = await this.authRepository.register(registerDto)

        // Token
        const token = await this.signToken({ id: user.id }, '3h')
        // No se debe avisar el errro 
        if (!token) throw CustomError.internalServer('Error genrating token')


        // Retornar token y datos user
        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
            }
        }
    }

}