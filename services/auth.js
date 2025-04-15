const jwt = require("jsonwebtoken");

const secretKey = "$Y0urbr0wn5uga$";

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "5h" });
  return token;
};

const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (err) {
    return null; // Token is either invalid or expired
  }
};

module.exports = {
  createTokenForUser,
  validateToken,
};
