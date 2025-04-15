const { createHmac, randomBytes } = require("crypto");
const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/profileImage.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"], //<== A list of allowed values for the role. The only valid options are "USER" and "ADMIN". If you try to assign any other value, Mongoose will throw an error.
      default: "USER",
    }, //<== this code ensures that each user has a role, and the role must either be "USER" or "ADMIN". If a role is not specified, it will automatically be set to "USER".
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // do stuff
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(this.email))
    return next(new Error("Invalid email format"));
  next();
});

userSchema.pre("save", function (next) {
  // do stuff
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

const User = model("user", userSchema);

module.exports = User;
