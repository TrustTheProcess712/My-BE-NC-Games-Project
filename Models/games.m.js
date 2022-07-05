const db = require("../db/connection");

exports.fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((result) => {
    return result.rows; //rows is the key that the data we queried is on
  });
};

exports.fetchReviewById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id=$1;", [review_id])
    .then((result) => {
      // console.log(result.rows); comes back as an array with an object thats why we return result.rows index 0
      return result.rows[0];
    });
};
