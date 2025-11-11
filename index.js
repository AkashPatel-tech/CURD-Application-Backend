const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use("/api/products", productRoute);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello from Node API server updated!");
});

mongoose
  .connect(
    "mongodb+srv://akashpatel56343_db_user:HlaLtnMyHDfRllFE@backend-curd.rawgjrd.mongodb.net/?appName=Backend-CURD"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })

  .catch(() => {
    console.log("Connection failed!");
  });
