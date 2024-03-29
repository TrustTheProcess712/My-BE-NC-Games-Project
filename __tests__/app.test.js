const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => db.end());

describe("GET api errors", () => {
  test("status:404, handles path not found", () => {
    return request(app)
      .get("/api/bad_path")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Path");
      });
  });
});

describe("GET /api/", () => {
  test("status 200: responds with json", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            endpoints: expect.any(Object),
          })
        );
      });
  });
});

describe("GET /api/categories", () => {
  test("status:200, responds with an array of objects with the properties slug and description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);
        expect(categories).toEqual([
          {
            slug: "euro game",
            description: "Abstact games that involve little luck",
          },
          {
            slug: "social deduction",
            description: "Players attempt to uncover each other's hidden role",
          },
          { slug: "dexterity", description: "Games involving physical skill" },
          {
            slug: "children's games",
            description: "Games suitable for children",
          },
        ]);
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("status:200, responds with a single review object", () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          review_id: review_id,
          title: "Jenga",
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Fiddly fun for all the family",
          category: "dexterity",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 5,
          comment_count: 3,
        });
      });
  });
  test("status:400, responds with a bad request error message when passed a bad review ID", () => {
    return request(app)
      .get("/api/reviews/notAniD")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
  test("status:404, respond with an error message when passed a valid ID number that is not found", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Review not found for review_id: 9999");
      });
  });
});

describe("GET /api/users", () => {
  test("status:200, responds with an array of objects with the intended properties ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);
        expect(users).toEqual([
          {
            username: "mallionaire",
            name: "haz",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          },
          {
            username: "philippaclaire9",
            name: "philippa",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
          },
          {
            username: "bainesface",
            name: "sarah",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
          },
          {
            username: "dav3rid",
            name: "dave",
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          },
        ]);
      });
  });
});

describe("GET /api/reviews/:review_id with a comment_count", () => {
  test("status: 200, responds with a comment_count added to our review object", () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body: { review } }) => {
        expect(review).toEqual(
          expect.objectContaining({
            review_id: review_id,
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            comment_count: 3,
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
          })
        );
      });
  });
  test("status:404, respond with an error message when passed a valid ID number that is not found", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Review not found for review_id: 9999");
      });
  });
  test("status:400, responds with a bad request error message when passed a bad review ID", () => {
    return request(app)
      .get("/api/reviews/notAniD")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("status:200, responds with a single review object", () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          review_id: review_id,
          title: "Jenga",
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Fiddly fun for all the family",
          category: "dexterity",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 5,
          comment_count: 3,
        });
      });
  });
  test("status:400, responds with a bad request error message when passed a bad review ID", () => {
    return request(app)
      .get("/api/reviews/notAniD")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
  test("status:404, respond with an error message when passed a valid ID number that is not found", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Review not found for review_id: 9999");
      });
  });
});

describe("GET /api/reviews", () => {
  test("status:200, responds with an array of objects containing review data in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body: { reviews } }) => {
        expect(reviews.length).toBeGreaterThan(0);
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
        });
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_img_url: expect.any(String),
              review_body: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("status:200, responds with an array of comments for the given review ID", () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments.length).toBe(3);
        expect(comments[0]).toEqual(
          expect.objectContaining({
            comment_id: 1,
            body: "I loved this game too!",
            review_id: 2,
            author: "bainesface",
            votes: 16,
            created_at: "2017-11-22T12:43:33.389Z",
          })
        );
      });
  });
  test("status:200, responds with an empty array when comments are not present for that review_id", () => {
    const review_id = 1;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeInstanceOf(Array);
        expect(comments.length).toBe(0);
      });
  });
  test("status:400, responds with a bad request error message when passed a bad review ID", () => {
    return request(app)
      .get("/api/reviews/notAniD")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
  test("status:404, respond with an error message when passed a valid ID number that is not found", () => {
    return request(app)
      .get("/api/reviews/775")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Review not found for review_id: 775");
      });
  });
});

describe("GET /api/reviews?sortby", () => {
  test("status: 200, reponds with reviews sorted by default of date decending", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("status: 200, reponds with reviews sorted by order of given query", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("votes", { descending: true });
      });
  });
  test("status: 200, reponds with reviews sorted by order of given query with a given category", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes&category=dexterity")
      .expect(200)
      .then(({ body: { reviews } }) => {
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              category: "dexterity",
            })
          );
        });
        expect(reviews).toBeSortedBy("votes", { descending: true });
      });
  });
  test("400: responds with invalid sort_by error message", () => {
    return request(app)
      .get("/api/reviews?sort_by=face")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid sort_by");
      });
  });
  test("400: responds with invalid order error message", () => {
    return request(app)
      .get("/api/reviews?order=ss")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid order");
      });
  });
  test("400: when passed an invalid category responds with invalid category error message", () => {
    return request(app)
      .get("/api/reviews?category=base")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid category");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("status: 201, responds with new comment added to the correct review object", () => {
    const newComment = {
      username: "mallionaire",
      body: "This game is awesome!",
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            body: "This game is awesome!",
            review_id: 2,
            author: "mallionaire",
            votes: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });
  test("status:400, responds with a bad request error message when passed an invalid username", () => {
    const newComment = {
      username: "invalid",
      body: "This game is awesome!",
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .expect(404)
      .send(newComment)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Sorry, invalid username!");
      });
  });
  test("status:400, responds with a bad request error message when passed an invalid or empty body", () => {
    const newComment = {
      username: "mallionaire",
      body: undefined,
    };
    return request(app)
      .post("/api/reviews/2/comments")
      .expect(400)
      .send(newComment)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
  test("status:404, respond with an error message when passed a valid ID number that is not found", () => {
    const newComment = {
      username: "mallionaire",
      body: "This game is awesome!",
    };
    return request(app)
      .post("/api/reviews/9999/comments")
      .expect(404)
      .send(newComment)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Review not found for review_id: 9999");
      });
  });
  test("status:400, responds with a bad request error message when passed a bad review ID", () => {
    const newComment = {
      username: "mallionaire",
      body: "This game is awesome!",
    };
    return request(app)
      .post("/api/reviews/notAnID/comments")
      .expect(400)
      .send(newComment)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
  test("status:400, responds with a bad request error message when passed a request with missing keys username/object", () => {
    const newComment = {};
    return request(app)
      .post("/api/reviews/notAnID/comments")
      .expect(400)
      .send(newComment)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("status: 200, responds with vote count updated on review object", () => {
    const voteUpdate = {
      inc_votes: 2,
    };
    return request(app)
      .patch("/api/reviews/2")
      .send(voteUpdate)
      .expect(200)
      .then(({ body: { review } }) => {
        expect(review).toEqual({
          review_id: 2,
          title: "Jenga",
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Fiddly fun for all the family",
          category: "dexterity",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 7,
        });
      });
  });
  test("status:404, respond with an error message when passed a valid ID number that is not found", () => {
    const voteUpdate = {
      inc_votes: 2,
    };
    return request(app)
      .patch("/api/reviews/9999")
      .expect(404)
      .send(voteUpdate)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Review not found for review_id: 9999");
      });
  });
  test("status:400, responds with a bad request error message when passed a bad review ID", () => {
    const voteUpdate = {
      inc_votes: 2,
    };
    return request(app)
      .patch("/api/reviews/notAnId")
      .expect(400)
      .send(voteUpdate)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
  test("status:400, responds with a bad request error message when passed an invalid voteObject object key", () => {
    const voteUpdate = {
      incre_votes: 2,
    };
    return request(app)
      .patch("/api/reviews/notAnId")
      .expect(400)
      .send(voteUpdate)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
  test("status:400, responds with a bad request error message when passed an invalid voteObject object value", () => {
    const voteUpdate = {
      inc_votes: "invalid",
    };
    return request(app)
      .patch("/api/reviews/notAnId")
      .expect(400)
      .send(voteUpdate)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("status 204:", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
});
