process.env.NODE_ENV = "test"; //Set env variable to test

const Admin = require("../../src/models/Admin.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../serverTest.js");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Requests de Auth", function() {
  beforeEach(function(done) {
    //Before each test we empty the database
    Admin.deleteMany({}, err => {
      done();
    });
  });

  describe("Token Test", () => {
    it("should block request when invalid token", done => {
      chai
        .request(server)
        .get("/authRequest")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.error.text).to.eql("Access Denied");
          done();
        });
    });
    it("should block request when invalid token", done => {
      chai
        .request(server)
        .get("/authRequest")
        .set("auth-token", "TokenInvalidoooooo")
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.error.text).to.eql("Invalid Token");
          done();
        });
    });

    it("should verify if token is correct", done => {
      const admin = {
        user: "usuario",
        password: "password"
      };
      chai
        .request(server)
        .post("/api/user/register")
        .send(admin)
        .end((err, res) => {
          chai
            .request(server)
            .post("/api/user/login")
            .send(admin)
            .end(function(err, res) {
              chai
                .request(server)
                .get("/authRequest")
                .set("auth-token", res.headers["auth-token"])
                .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.posts.title).to.be.eql('My first post');
                  expect(res.body.posts.description).to.be.eql('random data you shouldnt access without permission');
                  done();
                });
            });
        });
    });
  });

  describe("Endpoint Register Admin", function() {
    const admin = {
      user: "usuario",
      password: "password"
    };

    it("should register a new admin", function(done) {
      chai
        .request(server)
        .post("/api/user/register")
        .send(admin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("should not register admin when invalid body", done => {
      const invalidAdmin = {
        user: "",
        password: ""
      };

      chai
        .request(server)
        .post("/api/user/register")
        .send(invalidAdmin)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not register a existing admin", done => {
      const admin = Admin({
        user: "usuario",
        password: "password"
      });
      admin.save((err, savedAdmin) => {
        chai
          .request(server)
          .post("/api/user/register")
          .send(savedAdmin)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });

  describe("Endpoint Login", () => {
    it("should login in application", done => {
      const admin = {
        user: "usuario",
        password: "password"
      };
      chai
        .request(server)
        .post("/api/user/register")
        .send(admin)
        .end((err, res) => {
          chai
            .request(server)
            .post("/api/user/login")
            .send(admin)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    });

    it("should login in application", done => {
      const admin = {
        user: "usuario",
        password: "password"
      };

      const invalidAdmin = {
        user: "usuario",
        password: "passwordInvalidoooooooooo"
      };

      chai
        .request(server)
        .post("/api/user/register")
        .send(admin)
        .end((err, res) => {
          chai
            .request(server)
            .post("/api/user/login")
            .send(invalidAdmin)
            .end((err, res) => {
              expect(res.error.text).to.eql("Invalid Password");
              expect(res).to.have.status(400);
              done();
            });
        });
    });

    it("should login in application", done => {
      const admin = {
        user: "usuario",
        password: "password"
      };
      chai
        .request(server)
        .post("/api/user/register")
        .send(admin)
        .end((err, res) => {
          chai
            .request(server)
            .post("/api/user/login")
            .send(admin)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    });

    it("should not login with invalid body", done => {
      const invalidAdmin = {
        user: "",
        password: ""
      };

      chai
        .request(server)
        .post("/api/user/login")
        .send(invalidAdmin)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should return Access Denied if admin is not registered", done => {
      const admin = {
        user: "usuario",
        password: "password"
      };

      chai
        .request(server)
        .post("/api/user/login")
        .send(admin)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.error.text).to.eql("User does not exists");
          done();
        });
    });
  });
});
