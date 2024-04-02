const {
  addProduct,
  getAllProducts,
  getProductDetails,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const upload = require("../utils/fileUpload");
const router = require("express").Router();
router.post("/addnewproduct", upload.single("product_image"), addProduct);
router.get("/getallproduct", getAllProducts);
router.get("/getproductdetails/:id", getProductDetails);
router.get("/getproductsbycategory/:category_id", getProductsByCategory);
router.put("/ /:id", upload.single("product_image"), updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
