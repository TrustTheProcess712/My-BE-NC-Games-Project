const { fetchCommentsById, selectComments } = require("../Models/comments.m");
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
