const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

describe("the server", () => {
  describe("Get /", () => {
    it("should return a status code 200", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
