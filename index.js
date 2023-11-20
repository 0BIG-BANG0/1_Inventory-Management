
import express from 'express'

import ProductController from './src/controllers/product.controller.js'

import path from 'path'

import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from './src/middlewares/validation.middleware.js'

const server = express()

//parse form data
server.use(express.urlencoded({ extended: true }))

// for main.js
server.use(express.static('public'));

// setup view emgine settings
server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(), "src", "views"))

//using ejs layout
server.use(ejsLayouts)

// create an instance of ProductController
const productController = new ProductController()
server.get('/', productController.getProducts)
server.get('/new', productController.getAddForm)
server.get('/update-product/:id', productController.getUpdateProductView)
server.post('/', validationMiddleware, productController.addNewProduct)
server.post('/update-product', productController.postUpdateProduct)

//when corfirmining to delete then only changing it to post 
server.post('/delete-product/:id',productController.deleteProduct)

server.use(express.static('src/views'))

server.listen(3400, () => {
    console.log("Response received at port 3400")
})