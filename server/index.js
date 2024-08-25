const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
// const cors = require("cors");
require("dotenv").config();
require("./config/passport");

//routes
const invoiceRoutes = require("./routes/invoice.routes");
const authRoutes = require("./routes/auth.routes");
const zapierRoutes = require("./routes/zapier.routes");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/zapier", zapierRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port`, process.env.PORT || 5000);
});
