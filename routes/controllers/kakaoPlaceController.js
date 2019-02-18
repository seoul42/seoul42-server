const util = require('util');
const request = require('request');
const serviceKeys = require('./config/key.json').service_keys;
const serviceApis = require('./config/api.json').api_uri;

function convertKakaoPlaceOption(lng,lat,radius,category){
	var kakaoPlaceOptions = {
		headers: {
			'Authorization':  'KakaoAK '+ serviceKeys.kakao_place
		},
		uri: serviceApis.kakao_search_category,
		method: 'GET',
		qs: {
			x:lat,
			y:lng,
			radius:radius,
			category_group_code : category
		}
	}
	return kakaoPlaceOptions;
}

function connectKakaoPlaceApi(option){
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

exports.convertKakaoPlaceOption = convertKakaoPlaceOption
exports.connectKakaoPlaceApi = connectKakaoPlaceApi