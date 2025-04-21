const { Router } = require("express");
const { checkForAuthCookie } = require("../middleware/auth");
const { handleAddingNewBlog, handleAddComment, postReply , handleLikes, replyLike} = require("../controllers/blog");
const { upload } = require("../services/fileUpload");

const router = Router();

router.get("/add-new", (req, res) => {
  return res.render("newBlog", { user: req.user });
});

router.post("/add-new", (req, res) => {
  upload.single("coverImageUrl")(req, res, (err) => {
    if (err) {
      return res.render("newBlog", {
        user: req.user,
        error: err.message,
      });
    }
    const coverImageUrl = req.file ? req.file.path : null;
    handleAddingNewBlog(req, res);
  });
});

router.post('/blogs/comment/:blogId', handleAddComment)
router.post('/blogs/comment/:comment_id/like', handleLikes)
router.post('/blogs/comment/:blog_id/reply/:comment_id', postReply)
router.post('/blogs/comment/replies/:reply_id/like', replyLike);


module.exports = router;
