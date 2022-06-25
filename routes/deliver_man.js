var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var delivery_controller = require('../controller/delivery_controller');



var deliver_pro = multer.diskStorage({
	destination: './public/delivery_dashboard/images',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.jpg')
	}
})
var deliverpro = multer({ storage: deliver_pro })




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

router.get('/profile_update', auth_middleware, delivery_controller.profile_update);

// deliver registration end



router.post('/deliveryadd', deliverpro.single('photos'), delivery_controller.deliveryadd);

module.exports = router;
