const Blog = require("../models/blog");
const Comment = require("../models/comment");

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

  await Blog.create({
    title,
    body,
    coverImageURL: `/uploads/_${req.user._id}/${req.file.filename}`,
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
  return res.redirect(`/blogs/${req.params.blogId}`)
}

module.exports = {
  handleAddingNewBlog,
  handleAddComment,
};
