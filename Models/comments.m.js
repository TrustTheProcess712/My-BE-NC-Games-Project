const db = require("../db/connection");

exports.selectComments = (review_id) => {
  return db
    .query(
      `
    SELECT * FROM comments 
    WHERE review_id = $1`,
      [review_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchCommentsById = (comment_id) => {
  return db
    .query(
      `
SELECT * FROM
comments 
WHERE comment_id = $1`,
      [comment_id]
    )
    .then((result) => {
      if (result.rowCount > 0) {
        return result;
      } else {
        return Promise.reject({
          status: 404,
          msg: "Not Found - comment does not exist for this ID",
        });
      }
    });
};
