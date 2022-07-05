const { fetchCategories, fetchReviewById } = require("../Models/games.m");

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
    .catch(next);
};
