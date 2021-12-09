import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/db-api-commerce',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(db =>console.log('base de datos conectada'))
.catch(err=>console.log(err))