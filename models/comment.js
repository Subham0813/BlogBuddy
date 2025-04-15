const { model, Schema } = require("mongoose");
const { schema } = require("./blog");
const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "blog",
  },
}, {timestamps: true});

module.exports = model('comment', CommentSchema)
