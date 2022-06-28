var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var admin_login = require('../controller/admin_login');
var admin_setting = require('../controller/admin_setting');

var client_app = require('../controller/client_app');

var delivery_controller = require('../controller/delivery_controller');


var storage = multer.diskStorage({
	destination: './public/catagory',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.jpg')
	}
})
var upload = multer({ storage: storage })



var storage = multer.diskStorage({
	destination: './public/subcatagory',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.jpg')
	}
})
var subcatagory = multer({ storage: storage })



var itemdirect = multer.diskStorage({
	destination: './public/items_image_file',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.jpg')
	}
})
var itemsfile = multer({ storage: itemdirect })


var branddirect = multer.diskStorage({
	destination: './public/brand_image_path',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.jpg')
	}
})
var branddirection = multer({ storage: branddirect })



var company_profile = multer.diskStorage({
	destination: './public/company_info',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.jpg')
	}
})
var companyprofile = multer({ storage: company_profile })



var session = require('express-session');
router.use(session({
	name: 'app.sid',
	secret: "1234567890QWERTY",
	resave: true,
	saveUninitialized: true
}));


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



const session_middleware = (req, res, next) => {
	try {
		if (!req.session.admin) {
			next();
		} else {
			res.redirect('/admin/dashboard');
		}
	} catch (error) {
		console.log(error)
	}
}


const auth_middleware = (req, res, next) => {
	try {
		if (req.session.admin) {
			next();
		} else {
			res.redirect('/admin');
		}
	} catch (error) {
		res.redirect('/admin');
	}
}





router.get('/', session_middleware, admin_login.login);




router.get('/dashboard', auth_middleware, admin_login.dash);
router.get('/regi', admin_login.regi);
router.post('/login', admin_login.loginsystem);

router.get('/logoute', function (req, res, next) {
	console.log(req.session.username, "Signout");
	req.session.destroy(function (err) {
		res.redirect('/admin');
	});
});





// start catagory
router.get('/add_catagory', auth_middleware, admin_login.add_cat);
router.use('/catagorylist', express.static('./public/catagory'));
router.post('/catagoryfield', upload.single('catagory_img'), admin_login.insertcat);
router.get('/catadelete/:id', admin_login.cat_delete);
router.get('/manage_catagory', auth_middleware, admin_login.manage_cat);
// end catagory





// start sub catagory

router.get('/add_sub_catagory', auth_middleware, admin_login.add_sub_cat);

router.use('/subcatagorylists', express.static('./public/subcatagory'));
router.post('/catagorysub', subcatagory.single('subcatagory_img'), admin_login.insertsubcat);

router.get('/subcatadelete/:id', admin_login.subcat_delete);


router.get('/manage_sub_catagory', auth_middleware, admin_login.manage_sub_cat);
// end sub catagory



// start Items
router.get('/add_item', auth_middleware, admin_login.add_item);
router.use('/itemsapifile', express.static('./public/items_image_file'));
router.post('/item_add_data', itemsfile.array('imgfile', 2), admin_login.insertitems);
router.get('/manage_item', auth_middleware, admin_login.manage_item);
// End Items


//start brand
router.get('/add_brand', auth_middleware, admin_login.add_brand);
router.use('/brandapifile', express.static('./public/brand_image_path'));
router.post('/brand_add_data', branddirection.single('brand_img'), admin_login.insertbrand);


router.get('/manage_brand', auth_middleware, admin_login.manage_brand);
//end brand






//client side  start 


//catagory_get start
router.get('/cata_get_client', client_app.cata_get_client);


router.post('/sub_cata_sub_id_client', client_app.sub_cat_client);

router.post('/item_client', client_app.items_client);

//catagory_get end





//start header color change 
router.post('/header_background_color', admin_setting.headersetting);
//end header color change



//form display on/off start
router.post('/form_display', admin_setting.addform_display);
//start form display on/off end



//company profile update start
router.get('/company_update', auth_middleware, admin_setting.companyprofileupdate);
router.get('/get_profile', admin_setting.getprofile);
//company profile update end


router.use('/companyprofile', express.static('./public/company_info'));
router.post('/company_profile_update', companyprofile.single('company_logo'), admin_setting.companyprofile_update);



// delivery start
router.get('/manage_delivery_man', auth_middleware,admin_setting.manage_delivery_man);

router.get('/typechange/:type/:id', auth_middleware, admin_setting.typechange);
// delivery End




// admin Items Order start
router.get('/manage_items_order', auth_middleware,admin_setting.manage_items_order);
// admin Items Order End








module.exports = router;
