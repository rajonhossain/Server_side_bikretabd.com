var express = require('express');
var router = express.Router();




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('deliver_man/delivery_login');
});




module.exports = router;
