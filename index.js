const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
dotenv.config();

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const e = require("express");
const {
  checkForAuthCookie,
  checkForExistingUser,
} = require("./middleware/auth");

const app = express();


connectDb()

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "services/public/uploads/"))
);

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});

app.use("/", checkForExistingUser("token"), userRoute);
app.use("/user", checkForAuthCookie("token"), blogRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}/`);
});
