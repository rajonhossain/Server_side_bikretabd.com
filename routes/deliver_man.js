var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var delivery_controller = require('../controller/delivery_controller');


const auth_middleware = (req, res, next) => {
	try {
		if (req.session.delivery) {
			next();
		} else {
			res.redirect('/admin');
		}
	} catch (error) {
		res.redirect('/admin');
	}
}


router.get('/', auth_middleware, delivery_controller.dashboard);
router.get('/delivery_logoute/:delivery', auth_middleware, delivery_controller.delivery_logout);




module.exports = router;
