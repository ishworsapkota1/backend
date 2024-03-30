const CategoryModel = require("../model/categoryModel");

// insert into DB
exports.addCategory = async (req, res) => {
  let category = await CategoryModel.findOne({
    category_name: req.body.category_name,
  });
  if (category) {
    return res.status(400).json({ error: "category already exists" });
  }

  let categoryObj = await CategoryModel.create({
    category_name: req.body.category_name,
  });
  if (!categoryObj) {
    // error
    return res.status(400).send({ error: "Something went wrong" });
  }
  //   success
  res.send(categoryObj);
};

exports.getAllCategories = async (req, res) => {
  let categories = await CategoryModel.find();
  if (!categories) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.send(categories);
};
// to get categoryDetails
exports.getCategoryDetails = async (req, res) => {
  let category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.send(category);
};

// update category
exports.updateCategory = async (req, res) => {
  let categoryToUpdate = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      category_name: req.body.category_name,
    },
    { new: true }
  );
  if (!categoryToUpdate) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.send(categoryToUpdate);
};

// delete category using promise
// exports.deleteCategory = (req, res) => {
//   CategoryModel.findByIdAndDelete(req.params.id)
//     .then((deletedCategory) => {
//       if (!deletedCategory) {
//         return res.status(404).send({ error: " category not found" });
//       }
//       res.send({ message: "category deleted successfully" });
//     })
//     .catch((error) => res.status(400).json({ error: error }));
// };

// delete category using async await
exports.deleteCategory = async (req, res) => {
  try {
    let deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "error occured" });
    }
    res.send(deletedCategory);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
