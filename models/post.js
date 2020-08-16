var mongoose = require("mongoose")

var postSchema = new mongoose.Schema({
  title: String,
  des: String,
  content: String,
  photo: [
    {
      id: String,
      path: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Post", postSchema)
