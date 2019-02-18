const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const urlencode = require('urlencode');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
// Automatically allow cross-origin requests

const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');

const houseRoute = require('./routes/house.js');
const placeRoute = require('./routes/place.js');
const convertUtil = require('./routes/utils/convertUtil.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/house',houseRoute);
app.use('/place',placeRoute);

app.use(cors({ origin: true }));

const port = process.env.PORT || 3000;

var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

swaggerTools.initializeMiddleware(swaggerDoc,function(middleware){
	app.use(middleware.swaggerMetadata());

  	// Validate Swagger requests
	app.use(middleware.swaggerValidator());
  	app.use(middleware.swaggerUi());
  	app.use('/', function(req,res){
 	res.sendFile('./index.html', {root: __dirname })
})
});

app.listen(port, function(req,res){
	console.log("listen... port:"+port);
	console.log('Swagger-ui is available on http://localhost:%d/docs', port);
})
