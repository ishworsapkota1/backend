const {
  addCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const { checkAdmin } = require("../controller/userController");
const { categoryCheck, validate } = require("../validation");

const router = require("express").Router();

// endpoints
router.post("/addcategory", checkAdmin,categoryCheck,validate ,addCategory);
router.get("/category/:id", getCategoryDetails);
router.get("/getallcategories", getAllCategories);
router.patch("/updatecategory/:id", checkAdmin, updateCategory);
router.delete("/deletecategory", checkAdmin, deleteCategory);
module.exports = router;
