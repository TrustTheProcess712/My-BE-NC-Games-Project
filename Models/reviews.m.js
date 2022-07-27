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
      return result.rows;
    });
};

// exports.selectReviews = (sort_by = "created_at", order = "ASC", category) => {
//   const queryValues = [];
//   const validSortBy = [
//     "created_at",
//     "review_id",
//     "title",
//     "designer",
//     "owner",
//     "votes",
//     "category",
//   ];

//   const validOrder = ["ASC", "DESC"];

//   if (!validSortBy.includes(sort_by)) {
//     return Promise.reject({
//       status: 400,
//       msg: "Invalid sort_by",
//     });
//   }

//   if (!validOrder.includes(order.toUpperCase())) {
//     return Promise.reject({
//       status: 400,
//       msg: "Invalid Order",
//     });
//   }

//   let queryString = `SELECT * FROM reviews`;

//   if (category) {
//     queryString.push(category);
//     queryString += `WHERE category = ${queryValues.length}`;
//   }

//   if (sort_by || order) {
//     queryString += `ORDER BY ${sort_by} ${order}`;
//   }

//   return db.query(queryString, queryValues).then((results) => {
//     if (results.rows.length === 0) {
//       return Promise.reject({
//         status: 404,
//         msg: "No Reviews Found",
//       });
//     } else {
//       return results.rows;
//     }
//   });
// };
