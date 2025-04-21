const Blog = require("../models/blog");
const Comment = require("../models/comment");
const reply = require("../models/reply");
const Reply = require("../models/reply");

async function handleAddingNewBlog(req, res) {
  const { title, body } = req.body;
  if (!title)
    return res.render("newBlog", {
      error: "There should be a title..",
    });
  if (!body)
    return res.render("newBlog", {
      error: "There should be some content..",
    });

  const coverImageURL = req.file
    ? `/uploads/_${req.user._id}/${req.file.filename}`
    : null;

  await Blog.create({
    title,
    body,
    coverImageURL,
    createdBy: req.user._id,
  });

  return res.redirect(`/`);
}

async function handleAddComment(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blogs/${req.params.blogId}`);
}

async function postReply(req, res) {
  const { blog_id, comment_id } = req.params;
  const { replyContent } = req.body;

  const comment = await Comment.findOne({ _id: comment_id });
  if (!comment) return res.status(404).send("Comment not found");

  const reply = await Reply.create({
    message: replyContent,
    createdBy: req.user._id,
    commentId: comment_id,
    blogId: blog_id,
  });

  comment.replies.push(reply._id);

  await comment.save();
  res.redirect(`/blogs/${blog_id}`);
}

async function handleLikes(req, res) {
  const comment = await Comment.findById(req.params.comment_id);

  if (!comment) return res.status(404).send("Comment not found");

  const userId = req.user._id;
  const alreadyLiked = comment.likedBy.includes(userId);

  if (alreadyLiked) {
    comment.likedBy.pull(userId);
    comment.likes -= 1;
  } else {
    comment.likedBy.push(userId);
    comment.likes += 1;
  }

  await comment.save();
  return res.redirect(`/blogs/${comment.blogId}`);
}

async function replyLike(req, res) {
  const reply = await Reply.findById(req.params.reply_id);
  const userId = req.user._id;

  if (!reply) return res.status(404).send("Reply not found");
  const alreadyLiked = reply.likedBy.includes(userId);

  if (alreadyLiked) {
    reply.likedBy.pull(userId);
    reply.likes -= 1;
  } else {
    reply.likedBy.push(userId);
    reply.likes += 1;
  }

  await reply.save();
  res.redirect("back"); // Redirects to the same page
}

module.exports = {
  handleAddingNewBlog,
  handleAddComment,
  postReply,
  handleLikes,
  replyLike,
};
