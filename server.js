const express = require("express"); //commonJS module import
const helmet = require("helmet");
const cohortsRouter = require("./cohorts/cohorts-router.js");

const server = express();

//middleware / add this for POST request
server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("It's working!");
});

server.use("/api/cohorts", cohortsRouter);

module.exports = server; //CommonJS module server
