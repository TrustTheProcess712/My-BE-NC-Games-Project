const {
  fetchReviewById,
  updateReviewById,
  fetchAllReviews,
  // selectReviews,
} = require("../Models/reviews.m");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReview = (req, res, next) => {
  const { review_id } = req.params;
  const newVote = req.body.inc_votes;

  updateReviewById(review_id, newVote)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getAllReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  return fetchAllReviews(sort_by, order, category)
    .then((result) => {
      res.status(200).send({ reviews: result });
    })
    .catch((err) => {
      next(err);
    });
};
