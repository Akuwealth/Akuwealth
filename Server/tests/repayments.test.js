// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
// Configure chai
chai.use(chaiHttp);
chai.should();
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
