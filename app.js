require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// connecting to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const orderSchema = {
  userName: String,
  email: String,
  phone: String,
  adress: String,
  date: String,
  time: String,
  order: String,
};
const Order = mongoose.model("Order", orderSchema);

// routes
app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});
app.get("/cart", (req, res) => {
  res.sendFile("public/cart.html");
});
app.post("/cart", (req, res) => {
  const date = new Date();
  let newOrder = new Order({
    userName: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    adress: req.body.address,
    order: req.body.user_order,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  });
  newOrder.save();
  res.redirect("back");
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`);
});
