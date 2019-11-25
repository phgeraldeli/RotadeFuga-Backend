
const chai = require('chai');
const expect = chai.expect;
const {registerValidation, loginValidation} = require('../../src/controllers/Validation');



describe('Schemas Validation', () => {


    describe('should validate register', function () {
        it('should pass on Joi.validate', (done) => {
            const Register = {
                user: 'usuario',
                password: 'password'
            }
        
            const { value, error } = registerValidation(Register);
            expect(value.user).to.eql(Register.user);
            expect(value.password).to.eql(Register.password);
            expect(error).to.eql(null);
            done();
        });

        it('should fail on Joi.validade #Lenght of user field', (done) => {
            const Register = {
                user: 'user',
                password: 'password'
            }
        
            const { error } = registerValidation(Register);
            expect(error.details[0].message).to.eql('"user" length must be at least 5 characters long');
            expect(error.name).to.eql('ValidationError');
            done();
        });

        it('should fail on Joi.validade #Lenght of password field', (done) => {
            const Register = {
                user: 'usuario',
                password: 'pass'
            }
        
            const { error } = registerValidation(Register);
            expect(error.details[0].message).to.eql('"password" length must be at least 5 characters long');
            expect(error.name).to.eql('ValidationError');
            done();
        });
    });

    describe('should validate login', function () {
        it('should pass on Joi.validate', (done) => {
            const Login = {
                user: 'usuario',
                password: 'password'
            }
        
            const { value, error } = loginValidation(Login);
            expect(value.user).to.eql(Login.user);
            expect(value.password).to.eql(Login.password);
            expect(error).to.eql(null);
            done();
        });

        it('should fail on Joi.validade #Lenght of user field', (done) => {
            const Login = {
                user: 'user',
                password: 'password'
            }
        
            const { error } = loginValidation(Login);
            expect(error.details[0].message).to.eql('"user" length must be at least 5 characters long');
            expect(error.name).to.eql('ValidationError');
            done();
        });

        it('should fail on Joi.validade #Lenght of password field', (done) => {
            const Login = {
                user: 'usuario',
                password: 'pass'
            }
        
            const { error } = loginValidation(Login);
            expect(error.details[0].message).to.eql('"password" length must be at least 5 characters long');
            expect(error.name).to.eql('ValidationError');
            done();
        });
      });

   
});