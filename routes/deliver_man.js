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
		console.log(error);
	}
}


router.get('/', auth_middleware, delivery_controller.dashboard);
router.get('/delivery_logoute/:delivery', auth_middleware, delivery_controller.delivery_logout);


// deliver registration start 

router.get('/delivery_man_registration', delivery_controller.delivery_man_registration);
router.post('/delivery_man_registration_insert_data', delivery_controller.delivery_man_registration_insert_data);

// deliver registration end



module.exports = router;
