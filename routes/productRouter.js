const {
  addProduct,
  getAllProducts,
  getProductDetails,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { checkAdmin } = require("../controller/userController");
const { validate, productCheck } = require("../validation");
const upload = require("../utils/fileUpload");
const router = require("express").Router();
router.post(
  "/addnewproduct",
  checkAdmin,
  upload.single("product_image"),
  productCheck,
  validate,
  addProduct
);
router.get("/getallproduct", getAllProducts);
router.get("/getproductdetails/:id", getProductDetails);
router.get("/getproductsbycategory/:category_id", getProductsByCategory);
router.put("/ /:id", upload.single("product_image"), checkAdmin, updateProduct);
router.delete("/deleteproduct/:id", checkAdmin, deleteProduct);

module.exports = router;
