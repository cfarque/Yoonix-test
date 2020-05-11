const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const User = require("./Models/User");
app.use(formidableMiddleware());
app.use(
  expressJwt({ secret: process.env.MYSECRET }).unless({
    path: ["/signup", "/login"],
  })
);

app.post("/signup", async function (req, res) {
  const user = await User.findOne({ email: req.fields.email });
  if (req.fields.username && req.fields.email && req.fields.password) {
    if (!user) {
      const salt = uid2(64);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const newUser = new User({
        email: req.fields.email,
        salt: salt,
        hash: hash,
        account: {
          username: req.fields.username,
          phone: req.fields.phone,
        },
      });
      await newUser.save();
      res.json({ message: "Your registration is complete" });
    } else {
      res.json({ message: "Email already exist" });
    }
  }
});

app.post("/login", async function (req, res) {
  // Ici on vérifierait que le login et mot de passe sont corrects
  const user = await User.findOne({ email: req.fields.email });
  if (user) {
    if (
      SHA256(req.fields.password + user.salt).toString(encBase64) === user.hash
    ) {
      // création d'un token
      const token = jwt.sign(
        { username: req.fields.username },
        process.env.MYSECRET
      );
      res.send({ token: token, id: user._id });
    } else {
      res.send({ message: "Unauthorized access", token: null });
    }
  } else {
    res.send({ message: "Unauthorized access", token: null });
  }
});

app.get("/myprotectedpage/:id", async function (req, res) {
  const id = req.params.id;
  const user = await User.findById(id);

  res.json({ user: user });
});

app.get("/", (req, res) => {
  res.json({ message: "test route" });
});

app.all("*", (req, res) => {
  res.json({ message: "page not found" });
});

app.listen("3200", () => {
  console.log("Server Started");
});
