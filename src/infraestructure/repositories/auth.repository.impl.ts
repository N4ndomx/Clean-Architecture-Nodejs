import { AuthDataSource, AuthRepository, RegisterUserDTO, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private authDataSource: AuthDataSource
    ) { }
    getUsers(): Promise<UserEntity[]> {
        return this.authDataSource.getUsers()
    }
    register(registerUserDto: RegisterUserDTO): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto)
    }

}