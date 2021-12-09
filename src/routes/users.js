import {Router} from 'express'
import * as usersControllers from '../controllers/users'
import { verifyToken, isAdmin, validandoRoles, validandoUsuarioOCorreoExistente} from '../middlewares/validaciones'


const router = Router()

router.get('/', usersControllers.getUsers)

router.post('/',[verifyToken,isAdmin, validandoRoles, validandoUsuarioOCorreoExistente],usersControllers.addUser)
export default router