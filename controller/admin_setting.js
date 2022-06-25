var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db.js');
const fs = require('fs').promises;
require('dotenv').config()



exports.headersetting = (req, res, next) => {
	const header_back_color = req.body.header_back_color;
	const body_back_color = req.body.body_back_color;
	var setting = "UPDATE settingside SET header_back_color = '" + header_back_color + "', left_back_color = '" + body_back_color + "' WHERE id = 1";
	db.query(setting);
	res.redirect('/admin/company_update');
}


exports.addform_display = (req, res, next) => {
	const cat = req.body.cat_form;
	const sub_cat = req.body.sub_cat_form;
	const item = req.body.item_form;
	const brand = req.body.brand_form;




	if (cat != undefined) {
		var form_setting = "UPDATE admin_add_form_setting SET cat = '" + cat + "' WHERE id = 1";
	}

	if (sub_cat != undefined) {
		var form_setting = "UPDATE admin_add_form_setting SET sub_cat = '" + sub_cat + "' WHERE id = 1";
	}

	if (item != undefined) {
		var form_setting = "UPDATE admin_add_form_setting SET item = '" + item + "' WHERE id = 1";
	}

	if (brand != undefined) {
		var form_setting = "UPDATE admin_add_form_setting SET brand = '" + brand + "' WHERE id = 1";
	}
	// var form_setting = "UPDATE admin_add_form_setting SET cat = '" + cat + "', sub_cat = '" + sub_cat + "', item = '" + item + "', brand = '" + brand + "' + WHERE id = 1";
	db.query(form_setting);

	res.redirect('/admin/company_update');
}



exports.companyprofileupdate = (req, res, next) => {
	db.query('select * from admin_profile', function (error, company_profile, fields) {

		db.query('select * from admin_add_form_setting', function (error, form_setting, fields) {

			db.query('select * from settingside', function (error, stt_back_color, fields) {
				const header = stt_back_color[0].header_back_color;
				const body_color = stt_back_color[0].left_back_color;
				req.session.header = header;
				req.session.body_color = body_color;

				res.render('admin/company_update', {
					cat: form_setting[0].cat,
					sub_cat: form_setting[0].sub_cat,
					item: form_setting[0].item,
					brand: form_setting[0].brand,
					company_name: company_profile[0].company_name,
					company_address: company_profile[0].company_address,
					company_img: company_profile[0].company_img,
					id: 1,
					displayname: req.session.displayname,
					body_color: req.session.body_color,
					setting_header: req.session.header,
					bas_url: process.env.base_url
				});
			})
		})

	});
}



exports.getprofile = (req, res, next) => {

	db.query('select * from admin_profile', function (error, company_profile, fields) {
		res.json({
			data: company_profile
		})
	});
}



exports.companyprofile_update = (req, res, next) => {
	
	try {
	const company_name = req.body.company_name;
	const company_address = req.body.company_address;
	const company_img = req.file.filename;

		db.query("select * from admin_profile WHERE id = '" + 1 + "'", function (error, profile_id, fields) {
			fs.unlink('./public/company_info/' + profile_id[0].company_img);
			var company_profile = "UPDATE admin_profile SET company_name = '" + company_name + "', company_address = '" + company_address + "', company_img = '" + company_img + "' WHERE id = 1";
			db.query(company_profile);
			res.redirect('/admin/company_update');
		})
	}
	catch (err) {
		res.redirect('/admin/company_update');
	}

}



exports.manage_delivery_man = (req, res, next) => {

	db.query('select * from delivery', function (error, all_delivery_man, fields) {

		res.render('admin/manage_delivery_man', {
			setting_header: req.session.header,
			body_color: req.session.body_color,
			displayname: req.session.displayname,
			bas_url: process.env.base_url,
			all_delivery_man: all_delivery_man
		});
	});
}



exports.typechange = (req, res, next) => {

	const id = req.params.id;

	var type

	if (req.params.type === 'inactive') {
		type = 'active';
	} else {
		type = 'inactive';
	}

	console.log(1999, req.params.type);
	console.log(2000, type);

	var typechange = "UPDATE delivery SET type = '" + type + "' WHERE id =  " + req.params.id;
	db.query(typechange);

	res.redirect('/admin/manage_delivery_man');
}


