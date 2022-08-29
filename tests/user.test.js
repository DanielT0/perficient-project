const request = require("supertest");
const app = require("../dist/app");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

let userOne = {
  email: "admin2@gmail.com",
  password: "123452",
  first_name: "Daniel",
  last_name: "Torres",
  age: 25,
  description: "Description text",
  image: "IMAGE",
};

let token;
let id;

describe("Creating user", () => {
  it("Should create a new user", async () => {
    const res = await request(app)
      .post("/users/")
      .send({
        ...userOne,
      })
      .expect(201);
    token = res.body.token;
    id = res.body.id;
  }, 20000);
});

console.log(userOne);
describe("Obtaining token", () => {
  it("Should login a user", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "admin2@gmail.com",
        password: "123452",
      })
      .expect(200);
    token = res.body.token;
    id = res.body.id;
  }, 20000);
});

// describe("Updating user (PATCH)", () => {
//   it("Should partially update an user", async () => {
//     const res = await request(app)
//       .patch(`/users/${id}`)
//       .set("Token", `${token}`)
//       .send({
//         email: "admin2@gmail.com",
//         password: "123452",
//       })
//       .expect(200);
//     userOne = res.body;
//     token = res.token;
//   }, 20000);
// });

describe("Updating entire user (PUT)", () => {
  it("Should update an user", async () => {
    const res = await request(app)
      .put(`/users/${id}`)
      .set("Token", `${token}`)
      .send({
        first_name: "Daniel",
        last_name: "Torres Orjuela",
        email: "jaime2@gmail.com",
        password: "123452",
        age: 24,
        description: "Description text",
        image: "IMAGE",
      })
      .expect(201);
    userOne = res.body;
    token = res.token;
  }, 20000);
});

// describe("Get all users", () => {
//   it("Should get all the users", async () => {
//     const res = await request(app)
//       .get(`/users/`)
//       .set("Token", `${token}`)
//       .expect(200);
//     userOne = res.body;
//   }, 20000);
// });
