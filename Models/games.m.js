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
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Review not found for review_id: ${review_id}`,
        });
      }
      // console.log(result.rows); comes back as an array with an object thats why we return result.rows index 0
      console.log(result.rows);
      return result.rows[0];
    });
};
