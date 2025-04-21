const { Schema, model } = require("mongoose");
const replySchema = new Schema(
  {
    message: { type: String, required: true },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    commentId: { type: Schema.Types.ObjectId, ref: "comment" },
    blogId: { type: Schema.Types.ObjectId, ref: "blog" },
  },
  { timestamps: true }
);

module.exports = model("reply", replySchema);
