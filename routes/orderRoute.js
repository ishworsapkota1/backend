const express = require("express");
const {
  placeOrder,
  getAllOrders,
  getOrderDetails,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
} = require("../controller/OrderController");
const router = express.Router();

router.post("/placeorder", placeOrder);
router.get("/getallorders", getAllOrders);
router.get("/orderdetails/:id", getOrderDetails);
router.get("/ordersbyuser/:user_id", getOrdersByUser);
router.put("/updateorder/:id", updateOrder);
router.delete("/deleteorder/:id", deleteOrder);
module.exports = router;
