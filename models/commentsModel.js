const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = new schema({
  comment: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
  },
});

const commentsModel = mongoose.model("Comments", commentSchema, "comment");

module.exports = commentsModel;
