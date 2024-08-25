const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, requestToken, profile, cb) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log(existingUser);
        return cb(null, existingUser);
      }

      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email,
      }).save();

      console.log(newUser);
      return cb(null, newUser);
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
