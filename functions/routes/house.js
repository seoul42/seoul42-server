const express = require('express');
const router = express.Router();
const convertUtil = require('./utils/convertUtil.js');
const houseControllers = require('./controllers/HouseController.js'); 

router.get('/search/infos', function(req,res){
	const addressName = req.query.address;
	const kakaoLocationOption = convertUtil.convertKakaoLocationOption(addressName);
	houseControllers.connectApi(kakaoLocationOption).then(function(placeResult){
		//맵핑되는 주소를 못 찾을 때, 예를 들면 도로명.
		if(placeResult.address_result.meta.total_count==0){
			//empty
			placeResult.address_result = {};
			placeResult.address_status_code = 204;
			placeResult.house_rent_status_code = 204;
			placeResult.house_result = [{}];
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
			houseControllers.getHouseInfos(houseRentPriceOption,placeResult,compltedBCode).then(function(houseInfos){
				res.json(houseInfos);
			})
		}
	})
})


router.get('/search/find/infos', function(req,res){
	const notCompledtedAddress = req.query.address;
	const naverSelectionOption = convertUtil.convertSelectionHouse(notCompledtedAddress);
	console.log(naverSelectionOption)
	houseControllers.connectApi(naverSelectionOption).then(function(addressResult){
		if(addressResult.address_result.status=='OK' && addressResult.address_result.meta.totalCount>0){
			const addressInfos = addressResult.address_result.addresses[0];
			console.log(addressInfos.jibunAddress)
			const kakaoLocationOption = convertUtil.convertKakaoLocationOption(addressInfos.jibunAddress);
			houseControllers.connectApi(kakaoLocationOption).then(function(placeResult){
			//맵핑되는 주소를 못 찾을 때, 예를 들면 도로명.
			if(placeResult.address_result.meta.total_count==0){
				//empty
				placeResult.address_result = {};
				placeResult.address_status_code = 204;
				placeResult.house_rent_status_code = 204;
				placeResult.house_result = [{}];
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
				houseControllers.getHouseInfos(houseRentPriceOption,placeResult,compltedBCode).then(function(houseInfos){
					res.json(houseInfos);
				})
			}
		})
		}else{
			//집의 내역이 없을 때
			const resultParam = {
			address_result:{},
			address_status_code:400,
			house_result:[{}],
			house_rent_status_code:400}
			res.json(resultParam)
		}
	})
})


module.exports = router