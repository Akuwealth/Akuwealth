// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import moment from "moment";
// Configure chai
chai.use(chaiHttp);
chai.should();

// TESTS FOR USERS - GET, POST, PATCH & DELETE //

describe("Users", () => {
    describe(" /GET users", () => {
        // Test to get all user records
        it("should get List of all users", (done) => {
             chai.request(app)
                 .get('/api/v1/users')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('Object');
                     done();
                  });
              });   

         });


        describe(" /GET/:id users", () => {
        // Test to get single user record
        it("should get a single user record", (done) => {
             const id = 1;
             chai.request(app)
                 .get('/api/v1/users/1')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('Object');
                     done();
                  });
             });

         });

            

 /*
  * Test the /POST route
  */
  describe('/POST users', () => {
      
      it("should post a user", (done) => {
         chai.request(app)
          let newUser = {
                id : 1,
                email : "user@email.com",
                firstName : "Harry",
                lastName : "Stylo",
                password : "harry123",
                address : "No 5 East St. Kigali",
                status : "verified", 
                isAdmin : false, 

          }

        chai.request(app)
            .post('/api/v1/users')
            .send(newUser)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
            res.body.should.have.property('message').equal('created a new user');
                  newUser.should.have.property('email');
                  newUser.should.have.property('firstName');
                  newUser.should.have.property('lastName');
                  newUser.should.have.property('password');
                  newUser.should.have.property('address');
                  newUser.should.have.property('status');
                  newUser.should.have.property('isAdmin');
                  done();
            });
      });
  });

  /*
  * Test the /PATCH/:id route
  */
  describe('/PATCH/:id users', () => {
      it('it should UPDATE a user given the id', (done) => {
        const id = 1;
          let users = {id : 1, email : "user@email.com", firstName : "Harry", lastName : "Stylo", password : "harry123", address : "No 5 East St. Kigali",
                status : "verified", isAdmin : false}        
          let updatedUser = {id : 1, email : "user1@email.com", firstName : "Harry", lastName : "Stylo", password : "harry123", address : "No 5 East St. Kigali",
                status : "verified", isAdmin : false}   

            chai.request(app)
                .patch('/api/v1/users/1')
                .send(updatedUser)

                .end((err, res) => {
                      res.should.have.status(201);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').equal('user updated successfully');
                      updatedUser.should.have.property('email').equal('user1@email.com');
                  done();
                });
          });
      });



 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id users', () => {
      it('it should DELETE a user given the id', (done) => {
         let users = {id : 1, email : "user@email.com", firstName : "Harry", lastName : "Stylo", password : "harry123", address : "No 5 East St. Kigali", status : "verified", isAdmin : false}   

                chai.request(app)
                .delete('/api/v1/users/1')
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').equal('user successfully deleted');
                      done();
                });
          });
      });

  });



