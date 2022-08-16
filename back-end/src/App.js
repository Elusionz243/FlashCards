const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const knex = require("./db/connection");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const decksRouter = require("./decks/decks.router");

const app = express();

app.set("db", knex);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/decks", decksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
