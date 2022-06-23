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

