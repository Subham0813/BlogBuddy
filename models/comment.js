const { model, Schema } = require("mongoose");
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
    replies: [{ type: Schema.Types.ObjectId, ref: "reply" }],
  },
  { timestamps: true }
);

module.exports = model("comment", commentSchema);
