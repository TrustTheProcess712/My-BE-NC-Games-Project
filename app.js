const express = require("express");
const {
  handleInvalidPaths,
  handle500s,
  handlePsqlErrors,
  handleCustomErrors,
} = require("./Controllers/err.c");
const {
  getCategories,
  getReviewById,
  patchReview,
} = require("./Controllers/games.c");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReview);

app.use("*", handleInvalidPaths);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handle500s);

module.exports = app;
