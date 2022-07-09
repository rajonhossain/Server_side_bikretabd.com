##Express-Cross
A CORS middleware for express.js

[![Build Status](https://travis-ci.org/plasmashadow/express-cross.svg?branch=master)](https://travis-ci.org/plasmashadow/express-cross)
[![NPM Version](http://img.shields.io/npm/v/express-cross.svg?style=flat)](https://www.npmjs.org/package/express-cross)

##Installation

```
npm install express-cross
```

##Usage

In order to use express-cross into your express app.

```javascript

   var app = express();
   var cors = require('express-cross');

   app.use(cors(true, ["localhost", "google.com"], ["foo": "bar"]));

   app.get('/', function (req, res) {
     res.send('Hello World!');
   });

```

##License
###MIT
