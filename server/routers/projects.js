const express = require('express');
const router = express.Router();

const connection = require("../db/database")

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM projects', function (err, rows) {
      if (err) {
        req.flash('error', err)
        res.render('profile', { data: '' })
      } else {
        res.render('profile', { data: rows })
      }
    })
  })

module.exports = router;