import express from "express";
import router from "../routes/routes";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import jsonwebtoken from 'jsonwebtoken';
import secret from '../config/config';

const app = express();
const port = process.env.PORT || 3300;
app.use(express.json());

//set secret
app.set('Secret', 'config.secret');

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(router);

app.post('/test', function(req, res) {
  res.json(req.body);
});  
app.patch('/test', function(req, res) {
  res.json(req.body);
});  
app.post('/users.test', function(req, res) {
  res.json(req.body);
});  
app.patch('/users.test', function(req, res) {
  res.json(req.body);
});  

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
app.get('/', function(req, res) {
    res.send('Hello world  app is running on http://localhost:3300/');
});

export default app;

app.post('/authenticate',(req,res)=>{

    if(req.body.username==="aku"){

        if(req.body.password===123){
             //if eveything is okey let's create our token 

        const payload = {

            check:  true

          };

          var token = jsonwebtoken.sign(payload, app.get('Secret'), {
                expiresIn: 1440 // expires in 24 hours

          });


          res.json({
            message: 'authentication done ',
            token: token
          });

        }else{
            res.json({message:"please check your password !"})
        }

    }else{

        res.json({message:"user not found !"})

    }

})


	router.use((req, res, next) =>{


    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {

      // verifies secret and checks if the token is expired
      jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
        if (err) {
          return res.json({ message: 'invalid token' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {

      // if there is no token  

      res.send({ 

          message: 'No token provided.' 
      });

    }
  });

