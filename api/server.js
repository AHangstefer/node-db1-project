const express = require("express");
const accountRouter = require("../accountRouter")

const db = require("../data/dbConfig");

const server = express();

server.use(express.json());
server.use("/accounts", accountRouter)

module.exports = server;
