import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUser, RegisterUserDTO } from "../../domain"

export class AuthController {
    // DI
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        // Server ERROOR 
        console.log(error); // Usar Winston
        return res.status(500)

    }

    // En buenas practicas express no recomienda asycn para codigo asincrono
    registerUser = (req: Request, res: Response) => {
        const [err, registerDto] = RegisterUserDTO.create(req.body)
        if (err) return res.status(400).json({ err })

        new RegisterUser(this.authRepository)
            .execute(registerDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        res.json('controller login user ')

    }

    getUsers = (req: Request, res: Response) => {
        this.authRepository.getUsers().then(
            users => res.json(users))
            .catch(error => this.handleError(error, res))
    }

}