
import express from 'express'

import ProductController from './src/controllers/product.controller.js'

import path from 'path'

import ejsLayouts from 'express-ejs-layouts'


const server = express()

//parse form data
server.use(express.urlencoded({extended: true}))

// setup view emgine settings
server.set('view engine','ejs')
server.set('views', path.join(path.resolve(), "src", "views"))

//using ejs layout
server.use(ejsLayouts)

// create an instance of ProductController
const productController = new ProductController()
server.get('/', productController.getProducts)
server.get('/new',productController.getAddForm)
server.post('/',productController.addNewProduct)

server.use(express.static('src/views'))

server.listen(3400, () => {
    console.log("Response received at port 3400")
})