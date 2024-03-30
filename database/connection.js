const mongoose = require("mongoose");
DATABASE =
  "mongodb+srv://user12:<password>@cluster0.ljbg6mn.mongodb.net/Evolve1am?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log(" Database connected successfully");
  })
  .catch((err) => {
    console.log("Error in database");
  });
// npm init -y
// npm i express dotenv
// nodemon morgan mongoose
