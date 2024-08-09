const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const messages = await db.getAllMessagesWithUsers();

    res.render("index", { user: req.user, messages });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
