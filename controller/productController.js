const ProductModel = require("../model/productModel");

//add new product
exports.addProduct = async (req, res) => {
  // if (!req.file) {
  //   return res.status(404).send({ error: "Product image is required" });
  // }
  let product = await ProductModel.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    count_in_stock: req.body.count_in_stock, // kasari cout in stock
    product_image: req.file?.path,
  });
  if (!product) {
    return res.status(404).send({ error: error.message });
  }
  res.send(product);
};

// getAllProducts
exports.getAllProducts = async (req, res) => {
  let products = await ProductModel.find();
  if (!products) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(products);
};
// get products details
exports.getProductDetails = async (req, res) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(product);
};
// getproducts by category
exports.getProductsByCategory = async (req, res) => {
  let product = await ProductModel.find({
    category: req.params.category_id,
  });
  if (!product) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(product);
};

// update product
exports.updateProduct = async (req, res) => {
  let product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      count_in_stock: req.body.count_in_stock, // kasari cout in stock declare
      product_image: req.file?.path,
    },
    { new: true }
  );
  if (!product) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(product);
};
// delete product
exports.deleteProduct = async (req, res) => {
  let product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).send({ error: "product not found " });
  }
  res.send({ message: "Product deleted" });
};
