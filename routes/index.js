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

/* POST new message */
router.post("/", async function (req, res, next) {
  try {
    const username = req.body.username;
    const message = req.body.message;

    await db.addNewMessage(username, message);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

/* DELETE message */
router.delete("/messages/:id", async function (req, res, next) {
  try {
    const messageId = req.params.id;

    await db.deleteMessage(messageId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
