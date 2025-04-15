const Blog = require("../models/blog");
const Comment = require("../models/comment");

const { Router } = require("express");
const { handleSignIn, handleSignUp } = require("../controllers/user");

const router = Router();

router.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  const user = req.user;
  return res.render("home", {
    blogs: allBlogs,
    user: user,
  });
});

router.get("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findOne({ _id: blogId }).populate("createdBy");
  const user = req.user;
  const comments = await Comment.find({ blogId: blog._id }).populate(
    "createdBy"
  );
  return res.render("viewBlog", {
    blog: blog,
    user: user,
    comments: comments,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);

module.exports = router;
