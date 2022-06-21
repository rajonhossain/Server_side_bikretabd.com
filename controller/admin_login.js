var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var db = require('../db.js');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
require('dotenv').config()

console.log(process.env.base_url+"/catagory")



var connection

db.connect(function (err) {
	if (!err) {
		console.log("connnection");
		connection = "successfully";
	} else {
		console.log("connnection faild");
	}
});


exports.login = (req, res, next) => {
	res.render('adminlogin', {
		title: connection
	});
}


exports.regi = (req, res, next) => {
	const username = "deliveryman@gmail.com";
	const password = "123123";

	const hashPass = bcrypt.hashSync(password, 10);
	var sql = "INSERT INTO delivery (username, email, dbpassword) VALUES ('" + username + "', '" + username + "', '" + hashPass + "')";
	db.query(sql);
	res.redirect('/admin');
}





exports.dash = (req, res, next) => {
	db.query('select * from settingside', function (error, stt_back_color, fields) {
		db.query('select * from admin_add_form_setting', function (error, form_setting, fields) {

			const header = stt_back_color[0].header_back_color;
			const body_color = stt_back_color[0].left_back_color;
			req.session.header = header;
			req.session.body_color = body_color;

			res.render('admin/dashboard', {
				cat: form_setting[0].cat,
				sub_cat: form_setting[0].sub_cat,
				item: form_setting[0].item,
				brand: form_setting[0].brand,
				body_color: req.session.body_color,
				setting_header: req.session.header,
				messages: req.flash('success'),
				displayname: req.session.displayname
			});
		})
	})
}



exports.loginsystem = (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;
	var panel_name = req.body.panel_name;

	if (panel_name === "admin") {

		if (username != '' && password != '') {
			db.query('SELECT * FROM user WHERE username = ?', [username], function (error, results, fields) {

				if (results.length > 0) {
					bcrypt.compare(password, results[0].dbpassword, function (err, ress) {
						if (!ress) {
							res.redirect('/admin');
						} else {
							req.session.admin = "admin";
							req.session.username = username;
							console.log(99, req.session.admin);
							req.session.displayname = req.session.username.split("@")[0];
							req.flash('success', 'Login Successfully!')
							res.redirect('/admin/dashboard');
						}
					});
				} else {
					res.redirect('/admin');
				}
			});
		} else {
			res.redirect('/admin');
		}

	} else if (panel_name === "delivery") {


		if (username != '' && password != '') {
			db.query('SELECT * FROM delivery WHERE username = ?', [username], function (error, results, fields) {

				if (results.length > 0) {
					bcrypt.compare(password, results[0].dbpassword, function (err, ress) {
						if (!ress) {
							res.redirect('/admin');
						} else {							
							req.session.delivery = panel_name;							
							res.redirect('/desh_delivery');
						}
					});
				} else {
					res.redirect('/admin');
				}
			});
		} else {
			res.redirect('/admin');
		}



	} else {
		res.redirect('/admin');
	}

}




// start catagory

exports.add_cat = (req, res, next) => {
	db.query('select * from admin_add_form_setting', function (error, form_setting, fields) {
		res.render('admin/add_catagory', {
			cat: form_setting[0].cat,
			setting_header: req.session.header,
			body_color: req.session.body_color,
			displayname: req.session.displayname
		});
	});
}

exports.insertcat = (req, res, next) => {
	const name = req.body.name;
	const slug = name.replace(" ", "-");
	const catagory_img = req.file.filename;
	const image_path = process.env.base_url+"/catagory";
	const meta_description = req.body.metadescription;

	var add_catagory = "INSERT INTO catagoris (name, slug, catagory_img, image_path, meta_description) VALUES ('" + name + "','" + slug + "','" + catagory_img + "','" + image_path + "','" + meta_description + "')";
	const insertdata = db.query(add_catagory);

	res.redirect('/admin/add_catagory');
}




exports.manage_cat = (req, res, next) => {
	db.query('select * from catagoris', function (error, catalist, fields) {
		res.render('admin/manage_catagory', {
			setting_header: req.session.header,
			body_color: req.session.body_color,
			catalist: catalist,
			displayname: req.session.displayname
		});
	})
}

exports.cat_delete = (req, res, next) => {
	const iddelte = req.params.id;
	db.query("select * from catagoris WHERE id = '" + req.params.id + "'", function (error, results, fields) {
		console.log(results)
		const filedelete = fs.unlink('./public/catagory/' + results[0].catagory_img);
		if (filedelete) {
			db.query("DELETE FROM catagoris WHERE id = '" + req.params.id + "'", function (error, results, fields) {
				res.redirect('/admin/manage_catagory');
			})
		} else {
			res.redirect('/admin/manage_catagory');
		}
	})
}

// end catagory



// start sub catagory
exports.add_sub_cat = (req, res, next) => {
	db.query('select * from admin_add_form_setting', function (error, form_setting, fields) {
		db.query('select * from catagoris', function (error, cattitle, fields) {
			res.render('admin/add_sub_catagory', {
				setting_header: req.session.header,
				sub_cat: form_setting[0].sub_cat,
				body_color: req.session.body_color,
				cattitle: cattitle,
				displayname: req.session.displayname
			});
		});
	})
}


exports.insertsubcat = (req, res, next) => {
	const name = req.body.name;
	const slug = name.replace(" ", "-");
	const sub_catagory_img = req.file.filename;
	const image_path = process.env.base_url+"/subcatagory";
	const subcategory_id = req.body.subcategory_id;

	var add_subcatagory = "INSERT INTO subcategories (name, slug, sub_catagory_img, image_path, category_id) VALUES('" + name + "','" + slug + "','" + sub_catagory_img + "','" + image_path + "','" + subcategory_id + "')";
	db.query(add_subcatagory);

	res.redirect('/admin/add_sub_catagory');
}


exports.manage_sub_cat = (req, res, next) => {
	db.query('select * from subcategories', function (error, subcatalist, fields) {
		res.render('admin/manage_sub_catagory', {
			setting_header: req.session.header,
			body_color: req.session.body_color,
			subcatalist: subcatalist,
			displayname: req.session.displayname
		});
	})
}



exports.subcat_delete = (req, res, next) => {

	db.query("select * from subcategories WHERE id = '" + req.params.id + "'", function (error, results, fields) {
		console.log(results)
		const filedeletes = fs.unlink('./public/subcatagory/' + results[0].sub_catagory_img);
		if (filedeletes) {
			db.query("DELETE FROM subcategories WHERE id = '" + req.params.id + "'", function (error, results, fields) {
				res.redirect('/admin/manage_sub_catagory');
			})
		} else {
			res.redirect('/admin/manage_sub_catagory');
		}
	})
}

// end sub catagory





// start Items

exports.insertitems = (req, res, next) => {

	console.log(req.files[0].filename);
	console.log(req.files[1].filename);

	const item_name = req.body.item_name;
	const sub_cat_id = req.body.sub_cat_id;
	const brand_id = req.body.brand_id;
	const slug = item_name.replace(" ", "-");
	const details = req.body.details;
	const fontimg = req.files[0].filename;
	const backimg = req.files[1].filename;
	const image_path = process.env.base_url+"/items_image_file";
	const discount_price = req.body.dis_price;
	const regular_price = req.body.regular_price;
	const stock = req.body.stock;
	const status = req.body.status;
	const link = req.body.link;



	var add_items = "INSERT INTO items(item_name, sub_cat_id, brand_id, slug, details, fontimg, backimg, image_path, discount_price, regular_price, stock, status, link) VALUES('" + item_name + "','" + sub_cat_id + "','" + brand_id + "','" + slug + "','" + details + "','" + fontimg + "','" + backimg + "','" + image_path + "','" + discount_price + "','" + regular_price + "','" + stock + "','" + status + "','" + link + "')";
	db.query(add_items);
	res.redirect('/admin/add_item');
}

exports.add_item = (req, res, next) => {
	db.query('select * from catagoris', function (error, sub_cata, fields) {
		db.query('select * from brands', function (error, brand, fields) {
			db.query('select * from admin_add_form_setting', function (error, form_setting, fields) {

				res.render('admin/add_item', {
					brand_name: brand,
					item: form_setting[0].item,
					sub_cata: sub_cata,
					setting_header: req.session.header,
					body_color: req.session.body_color,
					displayname: req.session.displayname
				});
			});
		})
	})
}

exports.manage_item = (req, res, next) => {

	db.query('select * from items', function (error, itemsdata, fields) {
		res.render('admin/manage_item', {
			itemsdata: itemsdata,
			setting_header: req.session.header,
			body_color: req.session.body_color,
			displayname: req.session.displayname
		});
	})
}
// End Items


// start brand 
exports.add_brand = (req, res, next) => {
	db.query('select * from admin_add_form_setting', function (error, form_setting, fields) {
		res.render('admin/add_brand', {
			setting_header: req.session.header,
			brand: form_setting[0].brand,
			body_color: req.session.body_color,
			displayname: req.session.displayname
		});
	});
}


exports.insertbrand = (req, res, next) => {
	const brand_name = req.body.brand_name;
	const slug = brand_name.replace(" ", "-");
	const brand_img = req.file.filename;
	const image_path = process.env.base_url+"/brand_image_path";

	var add_brand = "INSERT INTO brands(brand_name, slug, brand_img, image_path)VALUES ('" + brand_name + "','" + slug + "','" + brand_img + "','" + image_path + "')";
	db.query(add_brand);
	res.redirect('/admin/add_brand');
}



exports.manage_brand = (req, res, next) => {

	db.query('select * from brands', function (error, brandsdata, fields) {
		res.render('admin/manage_brand', {
			brandsdata: brandsdata,
			setting_header: req.session.header,
			body_color: req.session.body_color,
			displayname: req.session.displayname
		});

	})
}




// end brand
