const express = require("express");
require("dotenv").config();
require("./database/connection");

// middleware imports
const morgan = require("morgan");
const cors = require("cors");

// import routes
const TESTROUTE = require("./routes/testRoute");

// import routes
const CategoryRoutes = require("./routes/categoryRoutes");
const ProductRoute = require("./routes/productRouter");
const UserRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// using  routes

// app.use("/api", TESTROUTE);
app.use("/api", CategoryRoutes);
app.use("/api", ProductRoute);
app.use("/api", UserRoute);
app.use("/api", orderRoute);

// app.use("/public/uploads");

app.use("/public/uploads", express.static("public/uploads"));
app.listen(port, () => {
  console.log(`App is running ${port}`);
});
