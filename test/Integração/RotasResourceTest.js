process.env.NODE_ENV = "test"; //Set env variable to test

const Rota = require("../../src/models/Rota.js");
const Ponto = require("../../src/models/Rota.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../serverTest.js");

const expect = chai.expect;
chai.use(chaiHttp);

const routeSaved = new Rota({
  pontos: [
    new Ponto({
      latitude: 808080,
      logintude: 808080
    })
  ]
});

describe("Requests de Rota", function() {
  beforeEach(function(done) {
    //Before each test we empty the database
    Rota.deleteMany({}, err => {
      done();
    });
  });
  describe("/Get", function() {
    it("should return an array of routes", function(done) {
      chai
        .request(server)
        .get("/rotas")
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.eql(0); //Now passing cause of the hook
          done();
        });
    });
  });
  describe("/Get:id", function() {
    let rota = new Rota({
      pontos: []
    });
    it("Should return an specific route by id", function(done) {
      rota.save((err, route) => {
        chai
          .request(server)
          .get("/rotas/" + route.id)
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body[0]._id).to.be.eql(route.id);
            done();
          });
      });
    });
    it("Should return 404 when id is not found", done => {
      chai
        .request(server)
        .get("/rotas/idInvalido")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("/Post", function() {
    it("Should post a new route", function(done) {
      let user = {
        user: "perrut",
        password: "123456"
      };
      chai
        .request(server)
        .post("/api/user/login")
        .send(user)
        .end(function(err, res) {
          chai
            .request(server)
            .post("/rotas")
            .set("auth-token", res.headers["auth-token"])
            .send({ pontos: [] })
            .end(function(err, resp) {
              expect(resp).to.have.status(200);
              expect(resp.body).to.be.an("object");
              done();
            });
        });
    });
    it("Should NOT post a new route without point", function(done) {
      let user = {
        user: "perrut",
        password: "123456"
      };
      chai
        .request(server)
        .post("/api/user/login")
        .send(user)
        .end(function(err, res) {
          chai
            .request(server)
            .post("/rotas")
            .set("auth-token", res.headers["auth-token"])
            .send(routeSaved)
            .end((err, resp) => {
              expect(resp).to.have.status(206);
              expect(resp.body.message).to.eql(
                "Missing field validation error"
              );
              done();
            });
        });
    });
  });

  describe("/Update", done => {
    const antigaRota = new Rota({
      pontos: []
    });
    let rota1 = {
      pontos: [
        {
          latitude: 123,
          longitude: 321
        }
      ]
    };
    it("should update a user given the id", done => {
      let novaRota = {
        pontos: [
          {
            latitude: 123,
            longitude: 321
          }
        ]
      };
      let userLogin = {
        user: "perrut",
        password: "123456"
      };
      antigaRota.save((err, rotaSalva) => {
        chai
          .request(server)
          .post("/api/user/login")
          .send(userLogin)
          .end(function(err, res) {
            chai
              .request(server)
              .put("/rotas/" + rotaSalva.id)
              .set("auth-token", res.headers["auth-token"])
              .send(novaRota)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.pontos[0].latitude).to.be.eql(
                  novaRota.pontos[0].latitude
                );
                expect(res.body.pontos[0].longitude).to.be.eql(
                  novaRota.pontos[0].longitude
                );
                done();
              });
          });
      });
    });

    it("should not update a user given the id with empty content", done => {
      const invalidRoute = {};
      let userLogin = {
        user: "perrut",
        password: "123456"
      };
      antigaRota.save((err, antigaRotaSalva) => {
        chai
          .request(server)
          .post("/api/user/login")
          .send(userLogin)
          .end(function(err, res) {
            chai
              .request(server)
              .put("/rotas/" + antigaRotaSalva.id)
              .set("auth-token", res.headers["auth-token"])
              .send(invalidRoute)
              .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.eql("Content cannot be empty");
                done();
              });
          });
      });
    });

    it("should not update a user given the invalid id", done => {
      let userLogin = {
        user: "perrut",
        password: "123456"
      };
      chai
        .request(server)
        .post("/api/user/login")
        .send(userLogin)
        .end(function(err, res) {
          antigaRota.save((err, user) => {
            chai
              .request(server)
              .put("/rotas/" + "idInvalidooooooooooo")
              .set("auth-token", res.headers["auth-token"])
              .send(rota1)
              .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.message).to.be.eql(
                  "Rota not found with id idInvalidooooooooooo"
                );
                done();
              });
          });
        });
    });
  });
});
