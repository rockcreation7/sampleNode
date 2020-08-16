var mongoose = require("mongoose")

var CheeseSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  userId: String,
})

module.exports = mongoose.model("Cheese", CheeseSchema)
