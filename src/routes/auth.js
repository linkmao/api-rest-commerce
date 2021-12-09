import {Router} from 'express'
import * as authController from '../controllers/auth'
import {validandoUsuarioOCorreoExistente, validandoRoles} from '../middlewares/validaciones'
const router = Router()



router.post('/signin', authController.signIn)
router.post('/signup',[validandoUsuarioOCorreoExistente,validandoRoles], authController.signUp)

export default router