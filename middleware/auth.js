const { validateToken } = require("../services/auth");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) return res.render("signup");

    const userPayload = validateToken(token);
    if (!userPayload) {
      res.clearCookie(cookieName);
      return res.render("signup");
    }

    req.user = userPayload;
    next();
  };
}

function checkForExistingUser(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    const userPayload = validateToken(token);
    req.user = userPayload;
    next();
  };
}

module.exports = {
  checkForAuthCookie,
  checkForExistingUser,
};
