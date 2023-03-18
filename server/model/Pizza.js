const mongoose = require("mongoose");
const { Schema, model } = mongoose;

let pizzaSchema = new Schema({
  name: String,
  ingredients: Array,
  price: Number,
  allergens: Array,
});

let Pizza = model("Pizza", pizzaSchema);
module.exports = Pizza;
