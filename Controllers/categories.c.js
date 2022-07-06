const { fetchCategories } = require("../Models/categories.m");

exports.getCategories = (req, res, next) => {
  fetchCategories().then((categories) => {
    //categories = result.rows
    res.status(200).send({ categories }); // this is now the data given a categeories key
  });
};
