export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        password: string,
        role: string[],
        img?: string,
    ) { }


    // La entidad es similar a la bd 
    // al inicio va ser muy similar 

    // Sin embargo deben ser desligadas a la bd 
    // se pueden remover campos en bd y nuestra entidad se cae 
    // con esta capa , asegura solo cambiar la entidad a lo largo de la app 

    // info que rije la app 
    // DTO construiran esta entidad 

}