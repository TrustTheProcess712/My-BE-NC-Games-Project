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
  return fetchAllReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

// exports.getReviews = (req, res, next) => {
//   const { sort_by, order, category } = req.query;
//   selectReviews(sort_by, order, category)
//     .then((reviews) => {
//       res.status(200).send({ reviews });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };
