import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
    getRegister(req, res) {
        res.render("register");
    }
    getLogin(req, res) {
        res.render("login", { errorMessage: null });
    }
    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);
        res.render("login", {
            errorMessage: null,
        });
    }
    postLogin(req, res) {
        const { email, password } = req.body;
        console.log(email, password);
        const user = UserModel.isValidUser(email, password);
        if (!user) {
            return res.render("login", {
                errorMessage: "Invalid Credentials",
            });
        }
        req.session.userEmail = email; //using session
        var products = ProductModel.get();
        res.render("products", { products, userEmail: req.session.userEmail, });
        // return res.render('/')
    }

    logout(req, res) {
        //on logout , destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/login");
            }
        });
        // clearing our cookie
        res.clearCoolie('lastVisit')
    }
}
