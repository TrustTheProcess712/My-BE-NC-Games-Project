const {
  fetchCommentsById,
  selectComments,
  insertComment,
} = require("../Models/comments.m");
const { fetchReviewById } = require("../Models/reviews.m");

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
