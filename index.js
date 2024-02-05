
import express from 'express'

import ProductController from './src/controllers/product.controller.js'

import path from 'path'

import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from './src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-uploadmiddleware.js'
import UserController from './src/controllers/user.controller.js'
import session from 'express-session'
import { auth } from './src/middlewares/auth.middleware.js'
import cookieParser from 'cookie-parser'
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js'

const server = express()

server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },// this is http if true then https then it becomes secure
})
);

//using cookieParser
server.use(cookieParser())

server.use(setLastVisit)

//parse form data
server.use(express.urlencoded({ extended: true }))

// create an instance of ProductController
const productController = new ProductController()
const usersController = new UserController()


// for main.js
server.use(express.static('public'));

// setup view emgine settings
server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(), "src", "views"))

//using ejs layout
server.use(ejsLayouts)


server.get('/logout', usersController.logout)
server.post('/login', usersController.postLogin)
server.post('/register', usersController.postRegister)
server.get('/login', usersController.getLogin)
server.get('/register', usersController.getRegister)
server.get('/', auth, productController.getProducts)
server.get('/new', auth, productController.getAddForm)
server.get('/update-product/:id', auth, productController.getUpdateProductView)
server.post('/', uploadFile.single('imageUrl'), validationMiddleware, auth, productController.addNewProduct)
server.post('/update-product', auth, productController.postUpdateProduct)

//when corfirmining to delete then only changing it to post 
server.post('/delete-product/:id', productController.deleteProduct)

server.use(express.static('src/views'))

server.listen(3400, () => {
    console.log("Response received at port 3400")
})