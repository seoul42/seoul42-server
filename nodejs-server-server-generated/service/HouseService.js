'use strict';


/**
 * search house
 * 주소를 입력받고, 해당 주소에 대한 전월세에 관련한 히스토리를 볼 수 있는 api 
 *
 * address String 검색하려는 집의 주소입니다.
 * returns HouseResult
 **/
exports.searchHouse = function(address) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address_status_code" : 200.0,
  "house_rent_status_code" : 200.0,
  "address_result" : {
    "building_name" : "서울살이오피스텔",
    "road_address_name" : "서울 관악구 신림동1길 7000",
    "x" : "126.92850344579581",
    "y" : "37.48712889295937",
    "address_name" : "서울 관악구 신림동 1431-38"
  },
  "house_result" : [ {
    "RENT_AREA" : "31",
    "ROOM_CNT" : "0",
    "LAND_CD" : "11620102001141237312",
    "HOUSE_GBN_NM" : "기타",
    "RENT_CASE_NM" : "준월세",
    "CNTRCT_YEAR" : "2015",
    "RENT_GTN" : "8000",
    "CNTRCT_DE" : "20151120",
    "RENT_FEE" : "460",
    "RENT_CD" : "3",
    "DONG_NM" : "1",
    "BLDG_NM" : "서울살이오피스텔",
    "FLR_NO" : "10",
    "ACC_YEAR" : "2015"
  }, {
    "RENT_AREA" : "31",
    "ROOM_CNT" : "0",
    "LAND_CD" : "11620102001141237312",
    "HOUSE_GBN_NM" : "기타",
    "RENT_CASE_NM" : "준월세",
    "CNTRCT_YEAR" : "2015",
    "RENT_GTN" : "8000",
    "CNTRCT_DE" : "20151120",
    "RENT_FEE" : "460",
    "RENT_CD" : "3",
    "DONG_NM" : "1",
    "BLDG_NM" : "서울살이오피스텔",
    "FLR_NO" : "10",
    "ACC_YEAR" : "2015"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

