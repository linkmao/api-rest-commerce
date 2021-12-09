import User from '../models/User'


export const getUsers= async(req,res)=>{
    const allUsers= await User.find()
    res.json(allUsers)
    }

export const addUser =  (req,res)=>{
    res.json({message:'Creando usuarios'})  // improtante, no se hizo la implenetnacion de add usuarios, pendiente
}