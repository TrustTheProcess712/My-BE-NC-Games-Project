\c nc_games_test 

SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
FROM reviews
LEFT JOIN comments ON comments.review_id = reviews.review_id
WHERE reviews.review_id = 2
GROUP BY reviews.review_id;

