import Users from "../db/users";
import moment from "moment";
class usersController {

  static getUsers(req, res) {
    return res.json({
      message: "List of all users",
      users: Users
    });
  }


static createUser(req, res) {
    const newId = parseInt(Users.length) + 1;    
    
      
    const newUser = {
          
    id: newId,
    email : req.body.email,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    password : req.body.password,
    address : req.body.address,
    status : req.body.status || unverified,
    isAdmin : req.body.isAdmin,
     

    };

    Users.push(newUser);
    return res.status(200).json({
      message: "created a new user",
      newUser
    });
  }


static getOneUser(req, res) {
    const { id } = req.params;
    const user = Users.find(oneUser => oneUser.id == id);
    if (user) {
      return res.status(200).json({
        message: "one user found",
        oneUser: user
      });
    }
     else {
      res.status(400).json({
        error: "no user found with that id"
      });
    }
  }


 
static verifyUser(req, res) {
     const { email} = req.params;
    let userFound;
  let itemIndex;
  Users.map((user, index) => {
    if (user.email === email) {
      userFound = user;
      itemIndex = index;
    }
  });

  if (!userFound) {
    return res.status(404).send({
      success: 'false',
      message: 'user not found',
    });
  }

  else if (!req.body.status) {
    return res.status(400).send({
      success: 'false',
      message: 'status is required',
    });
  } 

  const verifiedUser = {
    id: userFound.id,
    email: req.body.email || userFound.email,
    firstName: req.body.firstname || userFound.firstName,
    lastName: req.body.lastname || userFound.lastName,
    password: req.body.password || userFound.password,
    address: req.body.address || userFound.address,
    status: req.body.status || userFound.status,
    isAdmin: req.body.isAdmin || userFound.isAdmin,
   
  };

  Users.splice(itemIndex, 1, verifiedUser);

  return res.status(201).send({
    success: 'true',
    message: 'user updated successfully',
    updatedUser,
  });
};


  static deleteUser(req, res) {
    let { id } = req.params;
    const findUser = Users.find(user => {
      return user.id == id;

    });
    if (findUser) {
      const newUsers = Users.filter(user => {
        return user !== findUser;
      });
      res.status(200).json({
        message: "user successfully deleted",
       Users: newUsers
      });
    }
     else {
      res.status(400).json({
        error: "could not delete a user"
      });
    }
  }
};
export default usersController;
