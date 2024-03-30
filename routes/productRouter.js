const {
  addProduct,
  getAllProducts,
  getProductDetails,
  getProductsByCategory,
} = require("../controller/productController");
const upload = require("../utils/fileUpload");
const router = require("express").Router();
router.post("/addnewproduct", upload.single("product_image"), addProduct);
router.get("/getallproduct", getAllProducts);
router.get("/getproductdetails/:id", getProductDetails);
router.get("/getproductsbycategory/:category_id", getProductsByCategory);

module.exports = router;
