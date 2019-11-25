const chai = require('chai');
const expect = chai.expect;
const { hashPassword } = require('../../src/controllers/hashController');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const verify = require('../../src/controllers/verifyToken');
const jwt = require('jsonwebtoken');

var mochaAsync = (fn) => {
    return done => {
        fn.call().then(done, err => {
            done(err);
        });
    };
};

describe('Auth Validation', () => {
    describe('should hash password', () => {
        it('hashController should hash', mochaAsync(async (done) => {
            const password = '12345';

            const hashedPassword = await hashPassword(password);

            expect(hashPassword).not.to.eql(hashedPassword);
        }));

        it('should not hash null', mochaAsync(async (done) => {
            expect(hashPassword(null)).to.eventually.be.rejected;
        }))

        it('should not hash undefined', mochaAsync(async (done) => {
            expect(hashPassword(undefined)).to.eventually.be.rejected;
        }))
    });
});


