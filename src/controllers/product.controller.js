import path from "path";
import ProductModel from '../models/product.model.js'

export default class ProductController {
  getProducts(req, res) {
    // console.log(path.resolve());
    let products = ProductModel.get();
    console.log(products);
    
    res.render("products", {products})

    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html"),
    // )
  }
  getAddForm(req,res){
   return res.render("new-product")
  }

  addNewProduct(req,res){
    //acess data from form
    console.log(req.body);//undefined
    ProductModel.add(req.body)
    let products = ProductModel.get();//returning newly added Products
    
    return res.render('products',{products})
  }
}
