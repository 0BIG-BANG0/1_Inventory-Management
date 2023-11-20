import { body,validationResult } from "express-validator";
//HoistedDeclaration => a function
//Class
//assignment expression

const validateRequest = async(req, res, next) => {
  //validate data

//   const { name, price, imageUrl } = req.body;
//   let errors = [];
//   if (!name || name.trim() == "") {
//     errors.push("Name is required");
//   }
//   if (!price || parseFloat(price) < 1) {
//     errors.push("price must be a positive value");
//   }
//   try {
//     const validUrl = new URL(imageUrl);
//   } catch (err) {
//     errors.push("URL is invalid");
//   }

    //Replcaing the validation code and using express validator
    console.log(req.body)
    //1. Setup rles for validation.
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({gt:0}).withMessage("Price should be positive value"),
        body('imageUrl').isURL().withMessage('Invalid url'),
    ];

    //2. run those rules.
    await Promise.all(rules.map((rule)=> rule.run(req))
    );

    //3. check if there are any errors after running the rules.

    var validationErrors = validationResult(req)
    console.log(validationErrors)

// 4. If there are errors then show them
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};
export default validateRequest;