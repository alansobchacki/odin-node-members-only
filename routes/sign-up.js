const express = require("express");
const router = express.Router();
const db = require("../db/queries");

/* GET sign-up form page */
router.get("/", function (req, res, next) {
  res.render("sign-up-form");
});

/* POST create new user */
router.post("/", async function (req, res, next) {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const membership = "not_a_member"; // users are not members after sign-up

    console.log(userName);

    await db.addNewUser(
      firstName,
      lastName,
      userName,
      password,
      email,
      membership
    );
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;