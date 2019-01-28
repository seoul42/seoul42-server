const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const urlencode = require('urlencode');
const app = express();

const houseRoute = require('./routes/house.js');
const placeRoute = require('./routes/place.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/house',houseRoute);
app.use('/place',placeRoute);

const port = process.env.PORT || 3000;

app.listen(port, function(req,res){
	console.log("listen... port:"+port);
})