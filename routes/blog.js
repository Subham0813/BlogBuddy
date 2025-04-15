const { Router } = require("express");
const { checkForAuthCookie } = require("../middleware/auth");
const { handleAddingNewBlog, handleAddComment } = require("../controllers/blog");
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

module.exports = router;
