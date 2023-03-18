const mongoose = require("mongoose");
const {Schema, model} = mongoose;

let orderSchema = new Schema({
  pizzas: Array,
  date: Object,
  customer: Object,
  completed: Boolean
});

let Order = model("Order", orderSchema); 
module.exports = Order;