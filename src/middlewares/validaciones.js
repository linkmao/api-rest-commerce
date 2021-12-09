import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req,res,next)=>{
    const token= req.headers["x-access-token"]
    if (!token) return res.status(403).json({message:'Token no encontrado'})
    const decoded= jwt.verify(token, config.SECRET)  // Al decodificar obtiene el id del usuario identificado
    req.userId = decoded.id  // Es importante guardar este dato en el req, para que los demás midlewares puedan acceder a ese valor desde req
    const user=await User.findById(req.userId, {password:0})  //{password:0 }- es para que el retorno del suaurio no tenga la contraseña
    if (!user) return res.status(404).json({message:'Usuario no existe'})
    next()
}

export const isAdmin = async (req,res,next)=>{
    const user = await User.findById(req.userId)
    const roles = await  Role.find({_id:{$in:user.roles}})
    console.log(roles)
    for (let i=0;i<roles.length;i++){
        if (roles[i].name==="admin") {
            next()
            return
        }
    }    
    return res.status(403).json({message:'No tienes privilegios de administarador para la operacion'})
    
}


export const validandoRoles = (req, res, next)=>{
    const ROLES = ["admin", "user", "moderator"] //para no consultar la bd, coloco los roles conocidos acá
    if (req.body.roles){
        for (let i=0;i<req.body.roles.length;i++){
            if (!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message:`Role ${req.body.roles[i]} no existe`
                })
            }
        }
    }
    next()
}

export const validandoUsuarioOCorreoExistente = async (req,res,next)=>{
    const user = await User.findOne({username:req.body.username})
    if (user) return res.status(400).json({message:'El usuario ya existe'})
    const email = await User.findOne({email:req.body.email})
    if (email) return res.status(400).json({message:'El correo ya existe'})
    next()
}