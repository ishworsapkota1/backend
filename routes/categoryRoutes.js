const {
  addCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

const router = require("express").Router();

// endpoints
router.post("/addcategory", addCategory);
router.get("/category/:id", getCategoryDetails);
router.get("/getallcategories", getAllCategories);
router.patch("/updatecategory/:id", updateCategory);
router.delete("/deletecategory", deleteCategory);
module.exports = router;
