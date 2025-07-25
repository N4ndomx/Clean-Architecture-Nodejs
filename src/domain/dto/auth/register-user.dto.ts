import { Validators } from "../../../config"

export class RegisterUserDTO {
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ) { }

    static create(obj: { [key: string]: any }): [string?, RegisterUserDTO?] {
        // transformacion de json a  algo con forma 
        const { name, email, password } = obj

        // Validaciones - Sanatizacion de la data 
        if (!name) return ['Missing name']
        if (!email) return ['Missing email']
        if (!Validators.email.test(email)) return ['Email is not valid']
        if (!password) return ['Missing password']
        if (password.length < 8) return ['Password too short']
        if (typeof password == 'number') return ['Password should be a string']



        // retorno de una tupla 
        return [undefined, new RegisterUserDTO(name, email, password)]
    }
}