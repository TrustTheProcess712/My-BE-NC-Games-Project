const endpoints = require("../endpoints.json");
const { fetchReviewById } = require("../Models/reviews.m");
const {
  fetchCommentsById,
  selectComments,
  insertComment,
  removeComment,
} = require("../Models/comments.m");

exports.getCommentsById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const comments = await selectComments(review_id);
    await fetchCommentsById(review_id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.postCommentById = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const newComment = req.body;
    await fetchReviewById(review_id);
    const comment = await insertComment(review_id, newComment);
    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};
