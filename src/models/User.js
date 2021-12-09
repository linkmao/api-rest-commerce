import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema=   new Schema({
    username:{type:String, unique:true},
    email:{type:String, unique:true},
    password:{type:String, required:true},
    roles:[{
        ref:'Role',
        type: Schema.Types.ObjectId
    }]
},{
    timestamps:true,
    versionKey:false
})

// Lo nuevo aca es que el rol será un arreglo  y lo estamos relacionando con el esquema de roles de tal manera que
// cada usuario tendrá uno o varios roles, los cuales estarán identificados por el id


// Ahora vamos con la creacion de los metodos para la encriptacion de la contraseña y su comparacion, en este caso
// se va hacer uso del metodo static para no tener que instanciar objetos de la clase (en el desarrollo de logon-notes se hizo de otra manera)

userSchema.statics.encriptarPassword = async (password)=>{
    const salt= await bcrypt.genSalt(10)
    return  await bcrypt.hash(password, salt)
    
}


userSchema.statics.compararPassword= async (password, passwordRecived)=>{
    return await bcrypt.compare(password, passwordRecived)
}

export default model ('User', userSchema)
