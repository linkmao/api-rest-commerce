import Product from '../models/Product'

export const createProduct =async (req,res)=>{
    //console.log(req.body)
    const {name, category, price, imgUrl}= req.body
    const newProduct= new Product({name, category, price, imgUrl})
    const productSave= await newProduct.save()
    res.status(201).json(productSave)
}

export const getProduct =async (req,res)=>{
    const allProduct = await Product.find()
    res.status(200).json(allProduct)
}

export const getProductById =async (req,res)=>{
    const product= await Product.findById(req.params.id)
    res.status(200).json(product)
}

export const updateProductById = async (req,res)=>{
    const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true}) // esa pequea configuraicion es para que mongo devuelva el objeto actualizado
    res.status(200).json(productUpdate)
}

export const deleteProductById = async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).send("Dato borrado")
}

