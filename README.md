# 서울살이 서버 <img width="85" alt="kakaotalk_20190212_204520833" src="https://user-images.githubusercontent.com/22374750/52834626-1efe2080-3126-11e9-92c3-66ac08c1f2c9.png">
서울살이 어플리케이션의 서버

[![express](https://img.shields.io/badge/Express-4.16.4-green.svg)](https://expressjs.com/ko/)
[![node](https://img.shields.io/badge/Node-10.14.1-green.svg)](https://nodejs.org/ko/)
[![npm](https://img.shields.io/badge/Npm-6.4.1-green.svg)](https://www.npmjs.com/)

booscamp3_C팀의 서울살이 서버 repository입니다. Android프로젝트의 서버를 위해서 NodeJS로 구성한 프로젝트입니다.
각종 API를 처리하는 서버역할을 하고 있으며, express, node, npm등을 util, controller로 구분하여 처리했습니다.

<hr/>

#### 팀원 소개 : 문병학, 유지원, 최준영(링크 추가 예정)

서울살이는 서울살이를 시작하는 사람들에게 주택에 관한 정보를 제공하는 어플리케이션입니다.

현재 아파트에 대한 정보를 제공하는 다양한 어플리케이션이 존재하지만, 상대적으로 주택에 관련된 정보를 제공하는 어플리케이션은 부족합니다.
그렇기 때문에 이러한 부족한 정보를 서울살이라는 어플리케이션을 통해서 주택에 관련된 전/월세, 주변 지역 정보, 주택 정보등의 정보를 제공하려고 합니다.

<hr/>

![image](https://user-images.githubusercontent.com/22374750/52996284-77079080-3460-11e9-8f9c-44a15c6b0c9d.png)
해당 서버는 `카카오 지역 api`, `서울 전월세 api`를 총합적으로 관리하고 있습니다.
https://seoul42-api-seoul.azurewebsites.net/(https://seoul42-api-seoul.azurewebsites.net/)에 호스팅 했습니다.
Place와 House 정보를 얻어오기 위해서 router 또한 Place와 House로 구분지었습니다.
Place는 상권의 정보를 획득한 데이터를 Json으로 전송해주며, House는 매물 정보를 얻어와 Json으로 전송합니다.

<hr/>

![image](https://user-images.githubusercontent.com/22374750/52177071-3f151200-27ff-11e9-8b58-ebc916b21c75.png)

![image](https://user-images.githubusercontent.com/22374750/51818141-0eba0900-2311-11e9-9b90-52542547986a.png)

Place의 정보는 위경도, 반경, 카테고리를 받아서 해당 파라매터에 맞는 결과값을 얻어오게 됩니다.
House의 정보는 위경도를 받고, 해당 위경도의 행정코드의 10자리를 얻기 위해서 Kakao의 주소검색 API를 사용합니다.
행정코드 10자리를 획득한 후, 서버에서 별도의 9자리 로직(1, 본번(4자리), 부번(4자리))를 합쳐줘 완성된 행정번호를 만들어줍니다.
또한 이 행정번호를 다시, 서울시 공공데이터 API에 호출한 후에 검색 결과를 정제해서 데이터를 출력해줍니다.



<hr/>
