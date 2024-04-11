const OrderModel = require("../model/orderModel");
const OrderItemsModel = require("../model/orderItemsModel");
// const UserModel = require("../model/userModel");
const userModel = require("../model/userModel");
const orderItemsModel = require("../model/orderItemsModel");
// const orderItemsModel = require("../model/orderItemsModel");
// place order

exports.placeOrder = async (req, res) => {
  let orderItemsIds = await Promise.all(
    req.body.OrderItems.map(async (OrderItem) => {
      let orderItem = await OrderItemsModel.create({
        product: OrderItem.product,
        quantity: OrderItem.quantity,
      });
      if (!orderItem) {
        return res.status(400).send({ error: "Something went wrong" });
      }
      return orderItem._id;
    })
  );
  //   populate le id matra haina detail nai dekhaucha, comma(,) pachi ko value dincha
  let individual_total = await Promise.all(
    orderItemsIds.map(async (item_id) => {
      let item = await orderItemsModel
        .findById(item_id)
        .populate("product", "price");
      return item.product.price * item.quantity;
    })
  );
  let total = individual_total.reduce((acc, cur) => acc + cur);
  let address;
  if (req.body.address) {
    address = await AddressModel.create({
      street: req.body.address.street,
      city: req.body.address.city,
      state: req.body.address.state,
      zipcode: req.body.address.zipcode,
      country: req.body.address.country,
      country_code: req.address.body.country_code,
      phone: req.body.address.phone,
    });
  }

  let user = await userModel.findById(req.body.user);

  let order = await OrderModel.create({
    orderItems: orderItemsIds,
    total: total,
    user: req.body.user,
    address: req.body.address ? address_.id : user.address,
  });
  if (!order) {
    return res.status(404).send({ error: "error ayo" });
  }
  res.send(order);
};
// to get all orders
exports.getAllOrders = async (req, res) => {
  let orders = await OrderModel.find()
    .populate({ path: "user", populate: "address" })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category", populate: "category" },
    });
  if (!orders) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(orders);
};

// to get order details
exports.getOrderDetails = async (req, res) => {
  let orders = await OrderModel.find(req.params.id)
    .populate({ path: "user", populate: "address" })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category", populate: "category" },
    });
  if (!orders) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(orders);
};

// to get orders of a user
exports.getOrdersByUser = async (req, res) => {
  let orders = await OrderModel.find({ user: req.params.user_id })
    .populate({ path: "user", populate: "address" })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category", populate: "category" },
    });
  if (!orders) {
    return res.status(404).send({ error: "Something went wrong" });
  }
  res.send(orders);
};
// update order
exports.updateOrder = async (req, res) => {
  let order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus: req.body.order_status,
    },
    { new: true }
  );
  if (!order) {
    return res.status(404).send({ error: "Something went worng" });
  }
  res.send(order);
};
// delete order
exports.deleteOrder = (req, res) => {
  OrderModel.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).send({ error: "Order not found" });
      }
      order.orderItems.map((orderItem) => {
        orderItemsModel.findByIdAndDelete(orderItem).then((orderitem) => {
          if (!orderItem) {
            return res.status(404).send({ error: "Something went wrong" });
          }
        });
      });
      res.send({ message: "Order deleted succesfully" });
    })
    .catch((error) => {
      return res.status(404).send({ error: error.message });
    });
};
