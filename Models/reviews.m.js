const db = require("../db/connection");

exports.fetchReviewById = (review_id) => {
  return db
    .query(
      `
      SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
      FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id`,
      [review_id]
    )
    .then((result) => {
      console.log(result.rows);
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
//hi
exports.fetchAllReviews = () => {
  return db
    .query(
      `
      SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
      FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      GROUP BY reviews.review_id
      ORDER BY created_at DESC`
    )
    .then((result) => {
      console.log(result.rows, "<<<<<<< model");
      return result.rows;
    });
};
