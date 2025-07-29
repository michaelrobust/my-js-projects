// Set-Up Routes
const express = require('express');
const router = express.Router();
const path = require('path');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET to show static HTML file
    res.sendFile(path.resolve('public/webpage.html'));
  });

module.exports = router;