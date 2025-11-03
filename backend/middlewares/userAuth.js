// middleware to check if user is authenticated
const userAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "please log in." });
  }

  next();
};

export default userAuth;
