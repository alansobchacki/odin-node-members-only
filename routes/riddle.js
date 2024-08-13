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
      res.redirect("/");
    } else if (answer === process.env.RIDDLE_ADMIN_PASSWORD) {
      await db.changeUserMembership(username, "admin");
      res.redirect("/");
    } else {
      res.redirect("/riddle?message=Wrong!%20Try%20again?&correct=false");
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
