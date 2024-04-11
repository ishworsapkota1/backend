const { validationResult, check } = require("express-validator");

exports.categoryCheck = [
  check("category_name", "Category name is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Category name must be three characters"),
];
exports.validate = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
exports.productCheck = [
  check("title", "Product title is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Product name must be three characters"),

  check("price", "Price is required")
    .notEmpty()
    .isNumeric()
    .withMessage("price must be a number"),

  check("description", "Description is required")
    .notEmpty()
    .isLength({ min: 20 })
    .withMessage("description must be at least 20 characters"),

  check("count_in_stock", "count_in_stock is required")
    .notEmpty()
    .isNumeric()
    .withMessage("description must be at least 20 characters"),
];

exports.userCheck = [
  check("username", "Username is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("username must be at least 3 characters")
    .not()
    .isIn(["admin", "Admin", "test"])
    .withMessage("This username is not allowed"),
  check("email", "email is required")
    .isEmail()
    .withMessage("Email format incorrect"),
  check("password", "password is required")
    .notEmpty()
    .matches(/[a-z]/)
    .withMessage("password must be at least 1 lowercase")
    .matches(/[A-Z]/)
    .withMessage("password must be at least 1 uppercase")
    .matches(/[0-9]/)
    .withMessage("password must be at least 1 number")
    .matches(/[!@#$\-]/)
    .withMessage("password must be at least 1 symbol")
    .not()
    .isIn(["P@ssw0rd"])
    .withMessage("P@ssw0rd is not allowed"),
  check("gender")
    .isIn(["male", "female"])
    .withMessage("gender must be either 'male' or 'female"),
];
