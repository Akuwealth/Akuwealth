// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
// Configure chai
chai.use(chaiHttp);
chai.should();
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
