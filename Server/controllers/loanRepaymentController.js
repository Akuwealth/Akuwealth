import LoanRepayments from "../db/loanRepayments";
import moment from "moment";
class loanRepaymentsController {

  static getLoanRepayments(req, res) {
    return res.json({
      message: "List of all loanRepayments",
      loanRepayments: LoanRepayments
    });
  }


static createLoanRepayment(req, res) {
    const newId = parseInt(LoanRepayments.length) + 1;    
          
    const newLoanRepayment = {
          
          Id: newId,
          createdOn: req.body.createdOn,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          loanId : req.body.loanId,
          loanAmount: req.body.loanAmount,
          repaymentAmount: req.body.repaymentAmount, 
          monthlyInstallment: req.body.monthlyInstallment, 
          paidAmount: req.body.paidAmount, 
          balance: req.body.balance, 
          
     };

    
    LoanRepayments.push(newLoanRepayment);
    return res.status(200).json({
      message: "created a new loanRepayment",
      newLoanRepayment
    });
  }


static getOneLoanRepayment(req, res) {
    const { id } = req.params;
    const loanRepayment = LoanRepayments.find(oneLoanRepayment => oneLoanRepayment.id == id);
    if (loanRepayment) {
      return res.status(200).json({
        message: "one loanRepayment found",
        oneLoanRepayment: loanRepayment
      });
    } else {
      res.status(400).json({
        error: "no loanRepayment found with that id"
      });
    }
  }


  static updateLoanRepayment(req, res) {
     const id = parseInt(req.params.id, 10);
    let loanRepaymentFound;
  let itemIndex;
  LoanRepayments.map((loanRepayment, index) => {
    if (loanRepayment.id === id) {
      loanRepaymentFound = loanRepayment;
      itemIndex = index;
    }
  });

  if (!loanRepaymentFound) {
    return res.status(404).send({
      success: 'false',
      message: 'loanRepayment not found',
    });
  }

  if (!req.body.createdOn) {
    return res.status(400).send({
      success: 'false',
      message: 'createdOn is required',
    });
  } else if (!req.body.firstName) {
    return res.status(400).send({
      success: 'false',
      message: 'firstName is required',
    });
  }

  const updatedLoanRepayment = {
          id: loanRepaymentFound.id,
          createdOn: req.body.createdOn || loanRepaymentFound.createdOn,
          firstName: req.body.firstName || loanRepaymentFound.firstname,
          lastName: req.body.lastName || loanRepaymentFound.lastName,
          loanId : req.body.loanId || loanRepaymentFound.loanId,
          loanAmount: req.body.loanAmount || loanRepaymentFound.loanAmount,
          repaymentAmount: req.body.repaymentAmount || loanRepaymentFound.repaymentAmount, 
          monthlyInstallment: req.body.monthlyInstallment || loanRepaymentFound.monthlyInstallment, 
          paidAmount: req.body.paidAmount || loanRepaymentFound.paidAmount, 
          balance: req.body.balance || loanRepaymentFound.balance,
  };

  LoanRepayments.splice(itemIndex, 1, updatedLoanRepayment);

  return res.status(201).send({
    success: 'true',
    message: 'loanRepayment updated successfully',
    updatedLoanRepayment,
  });
};

  static deleteLoanRepayment(req, res) {
    let { id } = req.params;
    const findLoanRepayment = LoanRepayments.find(loanRepayment => {
      return loanRepayment.id == id;
    });
    if (findLoanRepayment) {
      const newLoanRepayments = LoanRepayments.filter(loanRepayment => {
        return loanRepayment !== findLoanRepayment;
      });
      res.status(200).json({
        message: "loanRepayment successfully deleted",
       LoanRepayments: newLoanRepayments
      });
    } else {
      res.status(400).json({
        error: "could not delete a loanRepayment"
      });
    }
  }
}


export default loanRepaymentsController;
