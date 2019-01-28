const express = require('express');
const request = require('request');
const async = require("async");
const router = express.Router();
const serviceKeys = require('./utils/config/key.json').service_keys;
const convertUtil = require('./utils/convertUtil.js');

router.get('/search/infos', function(req,res){
	const addressName = req.query.addressName;
	const kakaoLocationOption = convertUtil.convertKakaoLocationOption(addressName);
	connectApi(kakaoLocationOption).then(function(placeResult){
		//맵핑되는 주소를 못 찾을 때, 예를 들면 도로명.
		if(placeResult.address_result.meta.total_count==0){
			//empty
			placeResult.address_status_code = 204;
			placeResult.house_rent_status_code = 204;
			res.json(placeResult);
		}else{
			const addressInfos = placeResult.address_result.documents[0].address;
			const bCode = addressInfos.b_code;
			const mainAddressNo = addressInfos.main_address_no;
			const subAddressNo = addressInfos.sub_address_no;
			const lat = addressInfos.x;
			const lng = addressInfos.y;
			const radius = 1000;
			const compltedBCode = convertUtil.convertAddressToPNU(bCode,mainAddressNo,subAddressNo);
			const houseRentPriceOption = convertUtil.convertHouseRentPriceOption(compltedBCode);
			getHouseInfos(houseRentPriceOption,placeResult).then(function(houseInfos){
				console.log(houseInfos);
				res.json(houseInfos);
			})
		}
	})
})


//업데이트 해야함.
router.get('/search/detail', function(req,res){
	connectHouseDetail();
})

function connectHouseDetail(){}

function connectApi(option){
	return new Promise(function(resolve, reject){
		const resultParam = {
			address_result:{},
			address_status_code:200,
			house_result:{},
			house_rent_status_code:200
		}
		
		request(option, function(error, response, body){
			resultParam.address_status_code = response.statusCode;
			if(error){
				resultParam.address_result = error;
				return reject(resultParam);
			}
			try{
				const bodyResult = JSON.parse(body);
				resultParam.address_result = JSON.parse(body);
				resolve(resultParam);
			}catch(e){
				resultParam.address_status_code = 409;
				resultParam.address_result = JSON.parse(e);
				reject(resultParam);
			}
		});
	})
}

function getHouseInfos(houseRentPriceOption,notCompletedParam){
	return new Promise(function(resolve,reject){
		const resultParam = {
			address_result:{},
			address_status_code:notCompletedParam.address_status_code,
			house_result:{},
			house_rent_status_code:200
		}

		var options = [houseRentPriceOption];
		async.map(options, function(obj, callback) {
			// iterator function
			request(obj, function(error, response, body) {
				if (!error && response.statusCode == 200) {
			    // transform data here or pass it on
			    body = JSON.parse(body);
			    body.status_code = response.statusCode;
			    callback(null, body);
			}else {
				callback(error||response.statusCode);}
		});
		}, function(err, results) {
			if (err) {
				notCompletedParam.house_rent_status_code = 409;
				notCompletedParam.place_status_code = 409;
			} else {
				notCompletedParam.house_rent_status_code = results[0].status_code;
				notCompletedParam.house_result = results[0];
			}
			resultParam.house_result = notCompletedParam.house_result.houseRentPriceInfo.row;
			resultParam.house_rent_status_code = notCompletedParam.house_rent_status_code;
			const address_result = notCompletedParam.address_result.documents[0];
			resultParam.address_result['road_address_name']=address_result.road_address.address_name;
			resultParam.address_result['building_name']=address_result.road_address.building_name;
			resultParam.address_result['address_name']=address_result.address_name;
			resultParam.address_result['y']=address_result.address.y;
			resultParam.address_result['x']=address_result.address.x;
			resultParam.house_result.forEach(houseInfo=>{
				delete houseInfo.ORG_CD;
				delete houseInfo.SN;
				delete houseInfo.SGG_CD;
				delete houseInfo.SGG_NM;
				delete houseInfo.BJDONG_CD;
				delete houseInfo.BJDONG_NM;
				delete houseInfo.BOBN;
				delete houseInfo.BUBN;
				delete houseInfo.HOUSE_GBN;
				delete houseInfo.HOUSE_GBN_NAME;
				delete houseInfo.BEGIN_DE;
				delete houseInfo.END_DE;
				delete houseInfo.DCSN_DE;
				delete houseInfo.CNTRCT_GBN_NM;
				delete houseInfo.RENT_IRDS_GTN;
				delete houseInfo.RENT_IRDS_FEE;
				delete houseInfo.REGIST_DT;
			});
			
			resolve(resultParam);
		});
	})
}

module.exports = router