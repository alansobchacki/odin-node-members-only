const express = require("express");
const router = express.Router();
const db = require("../db/queries");
require("dotenv").config();

/* GET riddle page. */
router.get("/", async function (req, res, next) {
  try {
    res.render("riddle", { user: req.user });
  } catch (err) {
    return next(err);
  }
});

/* PATCH user membership status */
router.patch("/", async function (req, res, next) {
  try {
    const username = req.body.username;
    const answer = req.body.answer.toUpperCase();

    if (answer === process.env.RIDDLE_PASSWORD) {
      await db.changeUserMembership(username, "member");
      console.log("changing membership...");
      res.redirect("/");
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
