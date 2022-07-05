const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => db.end());

describe("games api errors", () => {
  test("status:404, handles bad paths", () => {
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
        // console.log(body, "<<<response body");
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
        });
      });
  });
  test("status:400, responds with an error message when passed a bad review ID", () => {
    return request(app)
      .get("/api/reviews/notAniD")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request, Invalid Input");
      });
  });
});
