import moment from "moment";
const loans = [

   {
		
		id : 1,
		email : "user@email.com", // user email
		firstName: "Harry",
		lastName: "Stylo",
		createdOn : 24/1/19,
		status : "pending", // pending, approved, rejected
		repaid : true,
		tenor : 4, // maximum of 12 months
		amount : 160000.00,
		paymentInstallment :42000.00, // monthly installment payment 		(amount + interest) / tenor
		balance : 0.00,
		interest : 8000.00, // 5% of amount
		
    },
    {
    	id : 2,
		email : "user2@email.com", // user email
		firstName: "Gretle",
		lastName: "Nice",
		createdOn :26/4/19,
		status : "pending", // pending, approved, rejected
		repaid : false,
		tenor : 8, // maximum of 12 months
		amount : 200000.00,
		paymentInstallment :27500.00, // monthly installment payment 		(amount + interest) / tenor
		balance : 200000.00,
		interest : 10000.00, // 5% of amount
    },
    {
     	id : 3,
		email : "user3@email.com", // user email
		firstName: "Bill",
		lastName: "Broming",
		createdOn : 15/4/19,
		status : "approved", // pending, approved, rejected
		repaid : false,
		tenor : 9, // maximum of 12 months
		amount : 300000.00,
		paymentInstallment :35000.00, // monthly installment payment 		(amount + interest) / tenor
		balance : 265000.00,
		interest : 15000.00, // 5% of amount

	}

	 
	  

	];
export default loans;
