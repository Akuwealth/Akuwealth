import Loans from "../db/loans";
import moment from "moment";
class loansController {

  static getLoans(req, res) {
    return res.status(200).json({
      message: "List of all loans",
      loans: Loans
    });
  }
static createLoan(req, res) {
    const newId = parseInt(Loans.length) + 1;    
          
    const newLoan = {
          
          id: newId,
          email: req.body.email,
          firstName: req.body.firstName, 
          lastName: req.body.lastName,
          createdOn: moment.utc().format(),
          status:  req.body.status || pending, 
          repaid: req.body.repaid,
          tenor: req.body.tenor, 
          amount: req.body.amount, 
          paymentInstallment: req.body.paymentInstallment, 
          balance: req.body.balance, 
          interest: req.body.interest, 
                   
     };

    Loans.push(newLoan);
    return res.status(200).json({
      message: "created a new loan",
      newLoan
    });
  }


static getOneLoan(req, res) {
    const { id } = req.params;
    const loan = Loans.find(oneLoan => oneLoan.id == id);
    if (loan) {
      return res.status(200).json({
        message: "one loan found",
        oneLoan: loan
      });
    } else {
      res.status(400).json({
        error: "no loan found with that id"
      });
    }
  }

static getUnrepaidLoans(req, res) {
    
     const {status} = req.params;
     const {repaid} = req.params;
     
    const uloan = Loans.find(unrepaidLoan => unrepaidLoan.status == "approved" && unrepaidLoan.repaid == false);
  
    if (!uloan) {
      return res.status(400).json({
        success: 'false',
        message: "There are no approved loans",
        
      });
    } 
    else {
    return res.status(200).send({
      message: 'Approved and unrepaid loans',
      unrepaidLoan: uloan
    });
  } 
  }


static getRepaidLoans(req, res) {
    
     const {status} = req.params;
     const {repaid} = req.params;
     
    const repaidloan = Loans.find(repaidLoan => repaidLoan.status == "approved" && repaidLoan.repaid == true);
  
    if (!repaidloan) {
      return res.status(400).json({
        success: 'false',
        message: "There are no repaid loans",
        
      });
    } 
    else {
    return res.status(200).send({
      message: 'Approved and repaid loans',
      repaidLoan: repaidloan
    });
  } 
  }



  static approveLoan(req, res) {
     const id = parseInt(req.params.id, 10);
    let loanFound;
  let itemIndex;
  Loans.map((loan, index) => {
    if (loan.id === id) {
      loanFound = loan;
      itemIndex = index;
    }
  });

  if (!loanFound) {
    return res.status(404).send({
      success: 'false',
      message: 'loan not found',
    });
  }

  else if (!req.body.status) {
    return res.status(400).send({
      success: 'false',
      message: 'status is required',
    });
  } 


  const updatedLoan = {
    id: loanFound.id,
    email: req.body.email || loanFound.email,
    firstName: req.body.firstname || loanFound.firstName,
    lastName: req.body.lastname || loanFound.lastName,
    createdOn: req.body.createdOn || loanFound.createdOn,
    status: req.body.status || loanFound.status,
    repaid: req.body.repaid || loanFound.repaid,
    tenor: req.body.tenor || loanFound.tenor,
    amount: req.body.amount || loanFound.amount,
    paymentInstallment: req.body.paymentInstallment || loanFound.paymentInstallment,
    balance: req.body.balance || loanFound.balance,
    interest: req.body.interest || loanFound.interest,
  };

  Loans.splice(itemIndex, 1, updatedLoan);

  return res.status(201).send({
    success: 'true',
    message: 'loan updated successfully',
    updatedLoan,
  });
};
   

   
  static deleteLoan(req, res) {
    let { id } = req.params;
    const findLoan = Loans.find(loan => {
      return loan.id == id;
    });
    if (findLoan) {
      const newLoans = Loans.filter(loan => {
        return loan !== findLoan;
      });
      res.status(200).json({
        message: "loan successfully deleted",
       Loans: newLoans
      });
    } else {
      res.status(400).json({
        error: "could not delete a loan"
      });
    }
  }


static approveLoan(req, res) {
  let  { approved }  = req.body;
  const {id} = req.params;

  // check if its a boolean 
  if(typeof(approved) != 'boolean' )
  {
    res.sendStatus(400);
    return;
  }

  const exists = Loans.filter((loan)=> loan.id==id).length > 0;    

  if(!exists){
    res.sendStatus(404);
    return;
  }

  Loans.map((loan)=>{
    if(loan.id == id) {
      loan.approved = approved;
    }
  });

  res.sendStatus(200);
};
}
export default loansController;
