const express = require('express');
const request = require('request');
const router = express.Router();
const serviceKeys = require('./utils/config/key.json').service_keys;
const convertUtil = require('./utils/convertUtil.js');

router.get('/search/infos', function(req,res){
	const lat = req.query.lat;
	const lng = req.query.lng;
	const radius = req.query.radius;
	const category = req.query.category;
	
	const kakaoPlaceOption = convertUtil.convertKakaoPlaceOption(lat,lng,radius,category);
	connectApi(kakaoPlaceOption).then(function(kakaoPlaceResult){
		var resultParam = {
			place_result : kakaoPlaceResult.result.documents,
			status_code : kakaoPlaceResult.status_code
		}
		console.log(resultParam);
		res.json(resultParam);
	})
})

router.get('/search/address/infos', function(req,res){
	const address = req.query.address

})
function connectApi(option){
	return new Promise(function(resolve, reject){
		var resultParam = {
			place_result:{},
			status_code:200
		}
		request(option, function(error, response, body){
			resultParam.status_code = response.statusCode;
			if(error){
				resultParam.result = error;
				return reject(resultParam);
			}
			try{
				resultParam.result = JSON.parse(body);
				//데이터 정제.
				resultParam.result.documents.forEach(function(place){
					delete place.category_group_code
					delete place.category_name
					delete place.id
				})
				resolve(resultParam);
			}catch(e){
				resultParam.status_code = 409;
				resultParam.result = JSON.parse(e);
				reject(resultParam);
			}
		});
	})
}

module.exports = router