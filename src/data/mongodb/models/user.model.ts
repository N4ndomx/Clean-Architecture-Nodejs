import {Schema,model} from 'mongoose'
const userSchema = new Schema({

    name :{
        type:String,
        required:[true,'Name is required']
    },

    email:{
        type:String,
        required: [true, 'Email is required'],
        unique:true
    },

    password:{
        type: String,
        required: [true, 'Password is required'],
    },

    image:{
        type: String,
    },

    roles:{
        type:[String],
        default:['USER_ROLE'],
        enum:['USER_ROLE','ADMIN_ROLE']
    }


})

export const UserModel = model('User',userSchema)