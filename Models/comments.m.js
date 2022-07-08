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
exports.insertComment = (review_id, newComment) => {
  const { username, body } = newComment;
  if (body === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request, Invalid Input",
    });
  }
  return db
    .query(
      `
    SELECT FROM users
    WHERE users.username = $1
    ;`,
      [username]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "Sorry, invalid username!",
        });
      }
    })
    .then(() => {
      return db.query(
        `
        INSERT INTO comments (body, review_id, author)
        VALUES ($1, $2, $3)
        RETURNING*
        `,
        [body, review_id, username]
      );
    })
    .then((result) => {
      return result.rows[0];
    });
};
