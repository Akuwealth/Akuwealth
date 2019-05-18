import express from "express";
import loanController from "../controllers/loanController";
import userController from "../controllers/userController";
import loanRepaymentController from "../controllers/loanRepaymentController";
const router = express.Router();
router.get("/api/v1/loans", loanController.getLoans);
router.post("/api/v1/loans", loanController.createLoan);
router.get("/api/v1/loans/:id", loanController.getOneLoan);
router.patch("/api/v1/loans/:id", loanController.updateLoan);
router.delete("/api/v1/loans/:id", loanController.deleteLoan);
router.get("/api/v1/loans/loans?status=approved&repaid=false", loanController.getUnrepaidLoans);
router.get("/api/v1/loans/loans?status=approved&repaid=true", loanController.getRepaidLoans);


router.get("/api/v1/users", userController.getUsers);
router.post("/api/v1/users", userController.createUser);
router.get("/api/v1/users/:id", userController.getOneUser);
router.patch("/api/v1/users/:email", userController.verifyUser);
router.delete("/api/v1/users/:id", userController.deleteUser);


router.get("/api/v1/loanRepayments", loanRepaymentController.getLoanRepayments);
router.post("/api/v1/loanRepayments", loanRepaymentController.createLoanRepayment);
router.get("/api/v1/loanRepayments/:id", loanRepaymentController.getOneLoanRepayment);
router.patch("/api/v1/loanRepayments/:id", loanRepaymentController.updateLoanRepayment);
router.delete("/api/v1/loanRepayments/:id", loanRepaymentController.deleteLoanRepayment);
export default router;
