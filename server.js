const express = require("express");

const server = express();

// middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send("It's working!");
});

module.exports = server; //CommonJS module server
