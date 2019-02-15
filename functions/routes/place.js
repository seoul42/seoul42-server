const express = require('express');
const router = express.Router();
const serviceKeys = require('./utils/config/key.json').service_keys;
const kakaoPlaceControllers = require('./controllers/KakaoPlaceController.js');

router.get('/search/infos', function(req,res){
	const lat = req.query.lat;
	const lng = req.query.lng;
	const radius = req.query.radius;
	const category = req.query.category;
	
	const kakaoPlaceOption = kakaoPlaceControllers.convertKakaoPlaceOption(lat,lng,radius,category);
	kakaoPlaceControllers.connectKakaoPlaceApi(kakaoPlaceOption).then(function(kakaoPlaceResult){
		var resultParam = {
			place_result : kakaoPlaceResult.result.documents,
			status_code : kakaoPlaceResult.status_code
		}

		res.json(resultParam);
	})
})

module.exports = router