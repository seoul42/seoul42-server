const util = require('util');
const async = require("async");
const request = require('request');
const serviceKeys = require('./config/key.json').service_keys;

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

function getHouseInfos(houseRentPriceOption,notCompletedParam,compltedBCode){
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
				callback(error||response.statusCode);
			}
		});
		}, function(err, results) {
			if (err) {
				notCompletedParam.house_rent_status_code = 409;
				notCompletedParam.place_status_code = 409;
			} else {
				notCompletedParam.house_rent_status_code = results[0].status_code;
				notCompletedParam.house_result = results[0];
			}
			//검색한 곳에 거래내역이 없을 경우.
			resultParam.address_result['pnu'] = compltedBCode;
			if(notCompletedParam.house_result.hasOwnProperty('RESULT'))
			{
				const address_result = notCompletedParam.address_result.documents[0];
				if(address_result.road_address!=null && address_result.road_address.hasOwnProperty('road_address_name')){
					resultParam.address_result['road_address_name']=address_result.address_name;
				}else{
					resultParam.address_result['road_address_name']="";
				}
				if(address_result.road_address!=null && address_result.road_address.hasOwnProperty('building_name')){
					resultParam.address_result['building_name'] = address_result.road_address.building_name;
				}else{
					resultParam.address_result['building_name'] = "";
				}
				resultParam.address_result['address_name']=address_result.address_name;
				resultParam.address_result['y']=address_result.address.y;
				resultParam.address_result['x']=address_result.address.x;
				resultParam.house_rent_status_code = 204
				resultParam.house_result=[{}];
			}
			else{
				resultParam.house_result = notCompletedParam.house_result.houseRentPriceInfo.row;
				resultParam.house_rent_status_code = notCompletedParam.house_rent_status_code;
				const address_result = notCompletedParam.address_result.documents[0];
				resultParam.address_result['road_address_name']=address_result.road_address.address_name;
				resultParam.address_result['building_name']=address_result.road_address.building_name;
				resultParam.address_result['address_name']=address_result.address_name;
				resultParam.address_result['y']=address_result.address.y;
				resultParam.address_result['x']=address_result.address.x;
				resultParam.house_result.forEach(function(houseInfo,index){
					resultParam.house_result[index].RENT_GTN = (resultParam.house_result[index].RENT_GTN / 10).toString();
					resultParam.house_result[index].RENT_FEE = (resultParam.house_result[index].RENT_FEE / 10).toString();
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
			}
			resolve(resultParam);
		});
	})
}

exports.connectApi = connectApi
exports.getHouseInfos = getHouseInfos