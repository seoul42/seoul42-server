const util = require('util');
const serviceKeys = require('./config/key.json').service_keys;
const serviceApis = require('./config/api.json').api_uri;

function convertGooglePlaceOption(keyword,lat,lng,radius){
	var googlePlaceOption = {
		uri: serviceApis.google_nearbysearch,
		method: 'GET',
		qs: {
			keyword : encodeURI(keyword),
			location:util.format('%f, %f',lng,lat),
			radius:radius,
			key:encodeURI(serviceKeys.google_search_place),
			language:'ko'
		}
	}
	return googlePlaceOption;
}

function convertGoogleStreetOption(){
	var googleStreetOption = {
		uri: serviceApis.google_streetview,
		method: 'GET',
		qs: {
			keyword : encodeURI(keyword),
			location:util.format('%f, %f',lng,lat),
			radius:radius,
			key:encodeURI(serviceKeys.google_search_place),
			language:'ko'
		}
	}
	return googleStreetOption;
}

function convertGoogleDetailOption(address,lat,lng){
	var googlePlaceOption = {
		uri: serviceApis.google_textsearch,
		method: 'GET',
		qs: {
			query : encodeURI(address),
			location:util.format('%f, %f',lng,lat),
			key:encodeURI(serviceKeys.google_search_place),
			language:'ko'
		}
	}
	console.log(googlePlaceOption)
	return googlePlaceOption;
}

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

function convertKakaoLocationOption(addressName){
	var kakaoLocationOption = {
		headers: {
			'Authorization':  'KakaoAK '+serviceKeys.kakao_location
		},
		uri: serviceApis.kakao_search_address,
		method: 'GET',
		qs:{
			query:addressName
		}
	}

	return kakaoLocationOption;
}

function convertKakaoAddressOption(addressName){
	var kakaoLocationOption = {
		headers: {
			'Authorization':  'KakaoAK '+serviceKeys.kakao_location
		},
		uri: serviceApis.kakao_search_my_address,
		method: 'GET',
		qs:{
			query:addressName
		}
	}

	return kakaoLocationOption;
}

function convertHouseRentPriceOption(bCode){
	var houseRentPriceOption = {
		uri: util.format(serviceApis.house_rent_info,serviceKeys.seoul_house,bCode),
		method: 'GET'
	}

	return houseRentPriceOption;
}

function convertSelectionHouse(notCompltedAddress){
	var naverSelectionOption = {
		headers: {
			'X-NCP-APIGW-API-KEY-ID':serviceKeys.naver_id ,
			'X-NCP-APIGW-API-KEY':serviceKeys.naver_secret
		},
		uri: serviceApis.naver_geo_address,
		method: 'GET',
		qs:{
			query:notCompltedAddress
		}
	}

	return naverSelectionOption;
}

function convertAddressToPNU(notCompltedBCode,mainAddressNo,subAddressNo){
	//not_complted_b_code 는 10자리
	//따라서 PNU를 만들기 위해서는 9자리가 필요
	//11번쨰 자리는 (토지 대장:1, 임야 대장:2)
	//12,13,14,15 (본번)
	//16,17,18,19 (부번)
	//kakaoAPI에 의해서 
	// main_address_no: '612',
    // sub_address_no: '20',
	//해당 값을 리턴받음
	const middlePoint = '1';
	const compltedBCode = notCompltedBCode+middlePoint+pad(mainAddressNo,4)+pad(subAddressNo,4);
	return compltedBCode;
}

function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

exports.convertSelectionHouse = convertSelectionHouse;
exports.convertKakaoAddressOption = convertKakaoAddressOption;
exports.convertHouseRentPriceOption = convertHouseRentPriceOption;
exports.convertKakaoLocationOption = convertKakaoLocationOption;
exports.convertGoogleDetailOption = convertGoogleDetailOption;
exports.convertGooglePlaceOption = convertGooglePlaceOption;
exports.convertKakaoPlaceOption = convertKakaoPlaceOption;
exports.convertAddressToPNU = convertAddressToPNU;