import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body
    const newUser = new User({
        username,
        email,
        password: await User.encriptarPassword(password)
    })

    // anáisis de roles
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })  // esto me devuelve un arreglo de roles si ecisten
        newUser.roles = foundRoles.map(role => role._id)
    }
    else {
        const role = await Role.findOne({ name: 'user' })
        newUser.roles = [role._id]
    }
    const userSaved = await newUser.save()
    console.log(userSaved)
    /* Luego de registrado el usuario le voy a generar el token
       jwt.sign({lo que voy a guardar}, palabra secreta,{objeto de configuracion})
     */
    const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
        expiresIn: 24 * 60 * 60,
    })
    res.status(200).json({ token })
}



export const signIn = async (req, res) => {
    const {email, password} = req.body
    const userFound = await User.findOne({email}).populate('roles') // populate me srive para que la información de roles salga no soloc on el id sino con su nombre tambien
    if (!userFound){
         res.status(400).json({message:'Usuario no encontrado'})
    }
    else {
      const matchPassword = await User.compararPassword(password, userFound.password)
        if (matchPassword){
            console.log(userFound)
            const token = jwt.sign({id:userFound._id},config.SECRET,{expiresIn: 24*60*60})
            res.status(200).json({token})
        } else {
            res.status(200).json({token:'Conntraseña no valida'})
        }
    
    }
}
