var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db.js');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');


exports.dashboard = (req, res, next) => {
	const id = req.session.uuid;

	db.query("select * from delivery where id = '" + id + "'", function (error, deliveryupdate, fields) {
		res.render('deliver_man/delivery_dashboard', {
			type: req.session.type,
			updatedata: deliveryupdate[0]
		});
	})
}


exports.delivery_logout = (req, res, next) => {
	if (req.params.delivery) {
		req.session.destroy(function (err) {
			res.redirect('/admin');
		});
	}
}



exports.delivery_man_registration = (req, res, next) => {

	res.render('deliver_man/delivery_registration', {
		error: req.flash('error')
	});
}



exports.delivery_man_registration_insert_data = (req, res, next) => {

	const user_name = req.body.user_name;
	const email = req.body.email;
	const nid_number = req.body.nid_number;
	const phone_number = req.body.phone_number;
	const password = req.body.password;
	const address = req.body.address;

	try {

		if (email.length != 0 && password.length != 0 && user_name.length != 0) {

			const hashPass = bcrypt.hashSync(password, 10);
			var delivery_man_registration = "INSERT INTO delivery (display_name,username,dbpassword,email,nid_number,phone) VALUES ('" + user_name + "','" + email + "','" + hashPass + "','" + email + "','" + nid_number + "','" + phone_number + "')";
			db.query(delivery_man_registration);
			res.redirect('/admin');
		} else {
			req.flash('error', "will be no email or password or user name empty")
			res.redirect('/desh_delivery/delivery_man_registration');
		}
	} catch (e) {
		req.flash('error', e)
		console.log(500, "error")
		res.redirect('/desh_delivery/delivery_man_registration');
	}


}



exports.profile_update = (req, res, next) => {

	const id = req.session.uuid;

	db.query("select * from delivery where id = '" + id + "'", function (error, deliveryupdate, fields) {

		console.log(deliveryupdate[0].display_name);

		res.render('deliver_man/profile_update', {
			type: req.session.type,
			updatedata: deliveryupdate[0]
		});
	})
}
