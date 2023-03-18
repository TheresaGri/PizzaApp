const mongoose = require("mongoose");
const { Schema, model } = mongoose;

let allergenSchema = new Schema({
  letter: String,
  name: String
});

let Allergen = model("Allergen", allergenSchema);
module.exports = Allergen;
