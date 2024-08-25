const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("http://localhost:3000");
});

module.exports = router;
