var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db.js');
const fs = require('fs').promises;


exports.dashboard = (req, res, next) => {
	res.render('deliver_man/delivery_dashboard',{
		type : req.session.type
	});
}


exports.delivery_logout = (req, res, next) => {
	if (req.params.delivery) {
		req.session.destroy(function (err) {
			res.redirect('/admin');
		});
	}
}



exports.delivery_man_registration = (req, res, next) => {
	res.render('deliver_man/delivery_registration');
}



exports.delivery_man_registration_insert_data = (req, res, next) => {

	console.log(req.body);

	res.redirect('/desh_delivery/delivery_man_registration');
}
