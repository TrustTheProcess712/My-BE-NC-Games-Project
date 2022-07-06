const {
  fetchCategories,
  fetchReviewById,
  updateReviewById,
  fetchUsers,
} = require("../Models/games.m");

exports.getCategories = (req, res, next) => {
  fetchCategories().then((categories) => {
    //categories = result.rows
    res.status(200).send({ categories }); // this is now the data given a categeories key
  });
};
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
exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};
