// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
// Configure chai
chai.use(chaiHttp);
chai.should();


// TESTS FOR LOANS - GET, POST, PATCH & DELETE //
describe("Loans", () => {
    describe(" /GET loans", () => {
        // Test to get all loan records
        it("should get List of all loans", (done) => {
             chai.request(app)
                 .get('/api/v1/loans')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('Object');
                     done();
                  });
              });   

         });


        describe(" /GET/:id loans", () => {
        // Test to get single loan record
        it("should get a single loan record", (done) => {
             const id = 1;
             chai.request(app)
                 .get('/api/v1/loans/1')
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
  describe('/POST loans', () => {
      
      it("should post a loan", (done) => {
         chai.request(app)
          let newLoan = {
                id : 1,
                email : "user@email.com", 
                firstName: "Harry",
                lastName: "Stylo",
                createdOn : 24/1/19,
                status : "approved", 
                repaid : true,
                tenor : 4, 
                amount : 160000.00,
                paymentInstallment :42000.00, 
                balance : 0.00,
                interest : 8000.00, 
        
          }
        chai.request(app)
            .post('/api/v1/loans')
            .send(newLoan)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
            res.body.should.have.property('message').equal('created a new loan');
                  newLoan.should.have.property('email');
                  newLoan.should.have.property('firstName');
                  newLoan.should.have.property('lastName');
                  newLoan.should.have.property('createdOn');
                  newLoan.should.have.property('status');
                  newLoan.should.have.property('repaid');
                  newLoan.should.have.property('tenor');
                  newLoan.should.have.property('amount');
                  newLoan.should.have.property('paymentInstallment');
                  newLoan.should.have.property('balance');
                  newLoan.should.have.property('interest');
              done();
            });
      });
  });

  /*
  * Test the /patch/:id route
  */
  describe('/PATCH/:id loans', () => {
      it('it should UPDATE a loan given the id', (done) => {
          let loans = { id : 1, email : "user@email.com", firstName: "Harry", lastName: "Stylo", createdOn : 24/1/19, status : "pending", 
                repaid : true, tenor : 4, amount : 160000.00, paymentInstallment :42000.00, balance : 0.00, interest : 8000.00}        
          let updatedLoan = { id : 1, email : "user@email.com", firstName: "Harry", lastName: "Stylo", createdOn : 24/1/19, status : "approved", 
                repaid : true, tenor : 4, amount : 160000.00, paymentInstallment :42000.00, balance : 0.00, interest : 8000.00}

            chai.request(app)
                .patch('/api/v1/loans/1')
                .send(updatedLoan)

                .end((err, res) => {
                      res.should.have.status(201);
                      res.body.should.be.a('Object');
                      res.body.should.have.property('message').equal('loan updated successfully');
                      updatedLoan.should.have.property('status').equal('approved');
                  done();
                });
          });
      });



 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id loans', () => {
      it('it should DELETE a loan given the id', (done) => {
         let loans = { id : 1, email : "user@email.com", firstname: "Harry", lastname: "Stylo", createdOn : 24/1/19, status : "approved", 
                repaid : true, tenor : 4, amount : 160000.00, paymentInstallment :42000.00, balance : 0.00, interest : 8000.00}

                chai.request(app)
                .delete('/api/v1/loans/1')
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').equal('loan successfully deleted');
                      done();
                });
          });
      });
  
});

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
  describe('/PATCH/:email users', () => {
      it('it should UPDATE a user status given the email', (done) => {
        const id = 1;
          let users = {id : 1, email : "user@email.com", firstName : "Harry", lastName : "Stylo", password : "harry123", address : "No 5 East St. Kigali",
                status : "pending", isAdmin : false}        
          let updatedUser = {id : 1, email : "user@email.com", firstName : "Harry", lastName : "Stylo", password : "harry123", address : "No 5 East St. Kigali",
                status : "verified", isAdmin : false}   

            chai.request(app)
                .patch('/api/v1/users/user@email.com')
                .send(updatedUser)

                .end((err, res) => {
                      res.should.have.status(201);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').equal('user updated successfully');
                      updatedUser.should.have.property('status').equal('verified');
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




// TESTS FOR LOAN REPAYMENTS - GET, POST, PATCH & DELETE //
describe("LoanRepayments", () => {
    describe(" /GET loanRepayments", () => {
        // Test to get all loan records
        it("should get List of all loanRepayments", (done) => {
             chai.request(app)
                 .get('/api/v1/loanRepayments')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('Object');
                     done();
                  });
              });   

         });


        describe(" /GET/:id loanRepayments", () => {
        // Test to get single loanRepayment record
        it("should get a single loanRepayment record", (done) => {
             const id = 1;
             chai.request(app)
                 .get('/api/v1/loanRepayments/1')
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
  describe('/POST loanRepayments', () => {
      
      it("should post a loanRepayment", (done) => {
         chai.request(app)
          let newLoanRepayment = {
                  id: 1,
                  createdOn : 24/2/19 ,
                  firstName: "Harry", 
                  lastName: "Stylo",
                  loanId : 1,
                  loanAmount: 160000.00,
                  repaymentAmount: 168000.00,
                  monthlyInstallment : 42000.00,
                  paidAmount : 42000.00,
                  balance : 126000.00,
        
          }
        chai.request(app)
            .post('/api/v1/loanRepayments')
            .send(newLoanRepayment)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
            res.body.should.have.property('message').equal('created a new loanRepayment');
                  newLoanRepayment.should.have.property('createdOn');
                  newLoanRepayment.should.have.property('firstName');
                  newLoanRepayment.should.have.property('lastName');
                  newLoanRepayment.should.have.property('loanId');
                  newLoanRepayment.should.have.property('loanAmount');
                  newLoanRepayment.should.have.property('repaymentAmount');
                  newLoanRepayment.should.have.property('monthlyInstallment');
                  newLoanRepayment.should.have.property('paidAmount');
                  newLoanRepayment.should.have.property('balance');
                  done();
            });
      });
  });

  /*
  * Test the /patch/:id route
  */
  describe('/PATCH/:id loanRepayments', () => {
      it('it should UPDATE a loanRepayment given the id', (done) => {
          let loanRepayments = {id: 1, createdOn : 24/2/19, firstName: "Harry", lastName: "Stylo", loanId : 1, loanAmount: 160000.00, 
                                   repaymentAmount: 168000.00, monthlyInstallment : 42000.00, paidAmount : 42000.00, balance : 126000.00}       
          let updatedLoanRepayment = {id: 1, createdOn : 24/2/19, firstName: "Harrey", lastName: "Stylo", loanId : 1, loanAmount: 160000.00, 
                                   repaymentAmount: 168000.00, monthlyInstallment : 42000.00, paidAmount : 42000.00, balance : 126000.00} 

            chai.request(app)
                .patch('/api/v1/loanRepayments/1')
                .send(updatedLoanRepayment)

                .end((err, res) => {
                      res.should.have.status(201);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').equal('loanRepayment updated successfully');
                      updatedLoanRepayment.should.have.property('firstName').equal('Harrey');
                  done();
                });
          });
      });



 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id loanRepayments', () => {
      it('it should DELETE a loan given the id', (done) => {
            let loans = {id: 1, createdOn : 24/2/19, firstName: "Harry", lastName: "Stylo", loanId : 1, loanAmount: 160000.00, 
                                repaymentAmount: 168000.00, monthlyInstallment : 42000.00, paidAmount : 42000.00, balance : 126000.00} 

                chai.request(app)
                .delete('/api/v1/loanRepayments/1')
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('Object');
                      res.body.should.have.property('message').equal('loanRepayment successfully deleted');
                      done();
                });
          });
      });
});
