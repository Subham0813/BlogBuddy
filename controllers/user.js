const User = require("../models/user");
const Blog = require("../models/blog");
const { createHmac } = require("crypto");
const { createTokenForUser } = require("../services/auth");

async function handleSignUp(req, res) {
  const { fullname, email, password } = req.body;

  try {
    await User.create({
      fullname,
      email,
      password,
    });
    return res.redirect("/signin");
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.render('signin', {error : 'Email already exists. Please  Login.'});
    }
    return res.status(500).render('signup',{ error: 'Something went wrong' });
  }
}
async function handleSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const blogs = await Blog.find({})
    if (!user)
      return res.render("signin", {
        error: "Incorrect email, User not found..",
      });

    const salt = user.salt;
    const hashedPassword = user.password;

    const currentHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== currentHashedPassword)
      return res.render("signin", { error: "Incorrect password.." });

    // res.json({ user: user });

    const token = createTokenForUser(user);
    return res.cookie("token", token).render("home", {
      user : user,
      blogs : blogs
    });
  } catch (e) {
    return res.render("signin", {
      error: "Incorrect Email or Password..",
    });
  }
}



module.exports = {
  handleSignUp,
  handleSignIn,
  
};
