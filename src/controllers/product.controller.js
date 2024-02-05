import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    // console.log(path.resolve());
    let products = ProductModel.get();
    // console.log(products);

    res.render("products", { products, userEmail: req.session.userEmail, });

    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html"),
    // )
  }
  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null, userEmail: req.session.userEmail, }); //here we have to send error message is empty
  }

  addNewProduct(req, res) {
    //acess data from form
    // console.log(req.body); //undefined
    const {name,desc,price} = req.body;
    const imageUrl = 'images/' + req.file.filename
    ProductModel.add(name, desc, price, imageUrl);
    let products = ProductModel.get(); //returning newly added Products

    return res.render("products", { products, userEmail: req.session.userEmail, });
  }

  getUpdateProductView(req, res, next) {
    //1. if product exists then retirn view
    // const {id} = req.body;
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null, userEmail: req.session.userEmail,
      });
    }

    //2. else return error
    else {
      res.status(401).send("Product not found");
    }
  }
  postUpdateProduct(req, res) {
    console.log(req.body); //undefined
    ProductModel.update(req.body);
    let products = ProductModel.get(); //returning newly added Products

     res.render("products", { products, userEmail: req.session.userEmail, });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found");
    }
    ProductModel.delete(id);
    let products = ProductModel.get();
    res.render("products", { products, userEmail: req.session.userEmail, });
  }
}
