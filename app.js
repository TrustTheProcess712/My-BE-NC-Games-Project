const express = require("express");
const cors = require("cors");
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
const {
  getCommentsById,
  postCommentById,
  deleteCommentById,
  getEndpoints,
} = require("./Controllers/comments.c");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/categories", getCategories);
app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getCommentsById);
app.get("/api/users", getUsers);
app.patch("/api/reviews/:review_id", patchReview);
app.post("/api/reviews/:review_id/comments", postCommentById);
app.delete("/api/comments/:comment_id", deleteCommentById);

app.use("*", handleInvalidPaths);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handle500s);

module.exports = app;
