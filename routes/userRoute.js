const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userSchema = require("../schemas/userSchema");

const User = mongoose.model("User", userSchema);

router.get("/:uid", (req, res) => {
  const uid = req.params.uid;

  User.findOne({ uid: uid }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).json({
        status: 404,
        message: "User Not Found.",
      });
    } else {
      res.status(200).json(user);
    }
  });
});
router.get("/email/:email", (req, res) => {
  const email = req.params.email;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).json({
        status: 404,
        message: "User Not Found.",
      });
    } else {
      res.status(200).json(user);
    }
  });
});

router.put("/", (req, res) => {
  const user = new User({ ...req.body });
  const nUser = user.toObject();
  delete nUser._id;

  var query = { email: user.email };

  User.findOneAndUpdate(
    query,
    nUser,
    { upsert: true, new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(user);
      }
    }
  );

  //   user.save((err, user) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       res.status(201).json(user);
  //     }
  //   });
});

module.exports = router;
