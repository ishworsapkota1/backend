const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
    },
    category: {
      type: ObjectId,
      ref: "categoryModel",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ProductModel", productSchema);
