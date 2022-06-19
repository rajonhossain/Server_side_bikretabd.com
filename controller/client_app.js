var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db.js');
const fs = require('fs').promises;


exports.cata_get_client = (req, res, next) => {

	db.query('select * from catagoris', function (error, cat_data, fields) {
		res.json({cat_data});
	});
}


exports.sub_cat_client = (req, res, next) => {
	db.query("SELECT * FROM subcategories WHERE category_id = '" + req.body.id + "'", function (error, sub_id, fields) {
		res.json({"sub_id" : sub_id});	
	})	
}


exports.items_client = (req, res, next) => {
	db.query("SELECT * FROM items WHERE sub_cat_id = '" + req.body.id + "'", function (error, items, fields) {
		res.json({"items" : items});	
	})	
}







