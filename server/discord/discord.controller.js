const express = require("express");
const router = express.Router();
const axios = require("axios");

// routes
router.post("/", postMessage);

module.exports = router;

function cleanInput(text) {
  return text
    .replace("@", "")
    .replace("#", "")
    .replace("`", "'")
    .replace("http://", "")
    .replace("https://", "");
}

function postMessage(req, res) {
  const userMessage = cleanInput(req.body.message);

  const textContent =
    "📦 a user submitted feedback at " +
    new Date().toLocaleString() +
    "\n" +
    `The user was ${!req.body.mobile ? "not " : ""}using a mobile device` +
    "\n\n" +
    ">>> " +
    userMessage;

  const postBody = {
    content: textContent,
  };

  axios({
    method: "post",
    url: process.env.DISCORD_WEBHOOK_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(postBody),
  })
    .then(() => {
      // console.log(data.body);
    })
    .catch(() => {
      // console.log(err.message);
    });

  res.json({ message: "cool" });
}
