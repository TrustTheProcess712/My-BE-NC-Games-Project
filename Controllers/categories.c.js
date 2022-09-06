const { fetchCategories } = require("../Models/categories.m");

exports.getCategories = (req, res, next) => {
  fetchCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};
