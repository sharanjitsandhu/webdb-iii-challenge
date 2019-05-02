const express = require("express"); //commonJS module import
const helmet = require("helmet");

const cohortsRouter = require("./cohorts/cohorts-router.js");
const studentsRouter = require("./students/students-router.js");
const server = express();

//middleware / add this for POST request
server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("It's working!");
});

server.use("/api/cohorts", cohortsRouter);
server.use("/students", studentsRouter);

module.exports = server; //CommonJS module server
