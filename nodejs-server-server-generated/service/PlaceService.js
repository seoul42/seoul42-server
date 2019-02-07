'use strict';


/**
 * search place
 * 좌표값을 입력받고, 입력받은 좌표값을 통해 해당 지역의 상권 정보를 얻는 api 
 *
 * lat BigDecimal 해당 지역의 위도 값입니다
 * lng BigDecimal 해당 지역의 경도 값입니다.
 * radius Integer 얼마만큼의 범위를 정하는 값입니다.
 * category String MT1  대형마트, CS2  편의점, PS3  어린이집, 유치원, SC4  학교, AC5  학원, PK6  주차장, OL7  주유소, 충전소, SW8  지하철역, BK9  은행, CT1  문화시설, AG2  중개업소, PO3  공공기관, AT4  관광명소, AD5  숙박, FD6  음식점, CE7  카페, HP8  병원, PM9  약국
 * returns PlaceResult
 **/
exports.searchPlace = function(lat,lng,radius,category) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "place_url" : "http://place.map.daum.net/12296239",
  "place_name" : "GS25 신림역점",
  "category_group_name" : "편의점",
  "road_address_name" : "서울 관악구 남부순환로 1617",
  "distance" : "327",
  "phone" : "02-872-6665",
  "x" : "126.930301346594",
  "y" : "37.484603540533",
  "address_name" : "서울 관악구 신림동 1422-38"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

