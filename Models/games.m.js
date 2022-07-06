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
      return result.rows[0];
    });
};

exports.updateReviewById = (review_id, newVote) => {
  return db
    .query(
      `UPDATE reviews
     SET votes = votes + $2 
     WHERE review_id = $1
     RETURNING *
  `,
      [review_id, newVote]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Review not found for review_id: ${review_id}`,
        });
      }

      return result.rows[0];
    });
};
exports.fetchUsers = () => {
  return db.query("SELECT * FROM users;").then((result) => {
    console.log(result.rows, "<<< model");
    return result.rows;
  });
};
