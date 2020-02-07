const express = require("express");
const mongoose = require("mongoose");
const User = require("./blogRoute");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router()

var salt = bcrypt.genSalt(10);
var bodyparser = require("body-parser");
const PORT = 5000;
var app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true})) 

module.exports = router;

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.json({
          status: "Mail exists"
        });
      } else {
        bcrypt.genSalt(10, function(err, salt) {

          bcrypt.hash(req.body.psw, salt, function(err, hash) {
            if (err) {
              console.log("Eror!!!!!!!!!!!", err);
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res
                  .json({ name:req.body.name,email: req.body.email,status: "Success", redirect: 'http://localhost:3000/blogs'})
                  // .redirect(302,"http://localhost:3000/blogs")    
                  console.log('User Created Successfully')
                  return;
                })
                .catch(err => {
                  console.log(err);
                  console.log("Error dublicate")
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        });
      }
    });
});

router.post("/signin", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      console.log(user)
      if (user.length < 1) {
        res
        .json({ status:"Authentication Failed! USER NOT PRESENT IN DATABASE"})
        console.log("Authentication Failed from server")
      }
      bcrypt.compare(req.body.psw, user[0].password, (err, result) => {
        if (err) {
          res
          .json({ status:"Authentication Failed!"})
          console.log("Authentication Failed from server")
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            "secret",
            {
              expiresIn: "1h"
            }
          );
          res
        .cookie('Token', token)
        // .redirect(302,"http://localhost:3000/blogs") 
        .json({name:user[0].name,email: req.body.email ,status: "Success", redirect: 'http://localhost:3000/blogs'})
        console.log("Successfully logged In")
        return;
        }
        res
        .json({ status:"Failed"})
        console.log("Authentication Failed from server")
    });
    })
    .catch();
});

