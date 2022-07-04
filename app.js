const express = require("express");
const { getCategories } = require("./Controllers/games.c");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);

//whatever

module.exports = app;
