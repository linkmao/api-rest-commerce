import {Router} from 'express'
import { verifyToken, isAdmin } from '../middlewares/validaciones'
// import { createProduct, getProduct,getProductById,updateProductById,deleteProductById } from '../controllers/products'  // Forma para importar funcion por funcion
import * as productController from '../controllers/products'  // asi las importamos todas las funciones

const router = Router()

router.post('/',[verifyToken, isAdmin] ,productController.createProduct) // Un arreglo de midllewares para validaciones consecutivas
router.get('/',productController.getProduct)
router.get('/:id',productController.getProductById)
router.put('/:id',verifyToken, productController.updateProductById)
router.delete('/:id',[verifyToken, isAdmin], productController.deleteProductById)


export default router