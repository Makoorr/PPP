const express = require('express');
const router = express.Router();

const connection = require("../db/database");

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM user', function (err, rows) {
      if (err) {
        req.flash('error', err)
      } else {
        console.log( rows )
      }
    })
  });

// router.post('/', function (req, res){
//   var username=req.body.user;
//   var password=req.body.pass;
//     connection.query("INSERT INTO `users` (username,password) VALUES (?)", username.toString(), password.toString(), function(err, result){
//       if (err) {
//         req.flash('error', err);
//       }
//       else {
//         console.log("1 record inserted");
//       }
//     });
//     res.send(username);
// });

module.exports = router;