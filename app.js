const express = require("express");
const {
  handleInvalidPaths,
  handle500s,
  handlePsqlErrors,
  handleCustomErrors,
} = require("./Controllers/err.c");
const {
  getReviewById,
  patchReview,
  getAllReviews,
} = require("./Controllers/reviews.c");
const { getCategories } = require("./Controllers/categories.c");
const { getUsers } = require("./Controllers/users.c");
const { getCommentsById } = require("./Controllers/comments.c");

const app = express();

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReview);
app.get("/api/users", getUsers);
app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id/comments", getCommentsById);

app.use("*", handleInvalidPaths);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handle500s);

module.exports = app;
