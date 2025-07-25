import { RegisterUserDTO } from "../dto/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource {

    // todo: 
    // abstract login(loginUserDTO: LoginUserDTO): Promise<UserEntity>
    abstract register(registerUserDto: RegisterUserDTO): Promise<UserEntity>
    abstract getUsers(): Promise<UserEntity[]>
}