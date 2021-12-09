import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import products from './routes/products'
import auth from './routes/auth'
import users from './routes/users'
import { createRoles } from './libs/initialSetup'

const app = express()
createRoles()


app.set('pkg', pkg)

// Midlewares
app.use(express.json())
app.use(morgan('dev'))




app.get('/',(req,res)=>{res.json({
    name:app.get('pkg').name,
    author:app.get('pkg').author,
    version:app.get('pkg').version,
    description:app.get('pkg').description
})})


app.use('/api/products', products) // por ser una api se sugiere qeu comience con api, sin embargo se puede omitor
app.use('/api/auth', auth)
app.use('/api/users', users)

export default app