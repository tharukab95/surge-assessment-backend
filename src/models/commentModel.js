const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    laureateId: {
      required: true,
      type: String,
    },
    comment: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
