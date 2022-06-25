var mysql = require('mysql');

var con = mysql.createConnection({
	host     : 'localhost',
    database : 'bikretabd',
    user     : 'root',
    password : ''
});

 
module.exports = con;




// var mysql = require('mysql');

// var con = mysql.createConnection({
// 	host     : 'localhost',
//     database : 'bikreta',
//     user     : 'bikreta',
//     password : 'Vrmu8@328'
// });
 
// module.exports = con;