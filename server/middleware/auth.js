module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
      // res.redirect('/auth/google');
    }
  },
};
