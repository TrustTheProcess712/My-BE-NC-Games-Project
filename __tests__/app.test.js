const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const reviews = require("../db/data/test-data/reviews");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => db.end());

describe("games api errors", () => {
  test("status:404, handles path not found", () => {
    return request(app)
      .get("/api/bad_path")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Path");
      });
  });
});

describe("GET /api/categories", () => {
  test("status:200, responds with an array of objects with the properties slug and description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        //same as -res.body.categories (object with array of objects on key of categories)
        const { categories } = body; //categories is now the array of objects requested
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
        console.log(review);
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
