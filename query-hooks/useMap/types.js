/**
 * @typedef DaumSeachMapResult
 * @property {string} postcode 구 우편번호 (2020년 3월 9일 이후로는 데이터가 내려가지 않습니다.)
 * @property {string} postcode1 구 우편번호 앞 3자리 (2020년 3월 9일 이후로는 데이터가 내려가지 않습니다.)
 * @property {string} postcode2 구 우편번호 뒤 3자리 (2020년 3월 9일 이후로는 데이터가 내려가지 않습니다.)
 * @property {string} postcodeSeq 구 우편번호 일련번호 (2020년 3월 9일 이후로는 데이터가 내려가지 않습니다.)
 * @property {string} zonecode 국가기초구역번호. 2015년 8월 1일부터 시행될 새 우편번호.
 * @property {string} address 기본 주소 (검색 결과에서 첫줄에 나오는 주소, 검색어의 타입(지번/도로명)에 따라 달라집니다.)
 * @property {string} addressEnglish 기본 영문 주소
 * @property {string} addressType 검색된 기본 주소 타입: R(도로명), J(지번)
 * @property {string} bcode 법정동/법정리 코드
 * @property {string} bname 법정동/법정리 이름
 * @property {string} bnameEnglish 법정동/법정리 이름의 영문
 * @property {string} bname1 법정리의 읍/면 이름 ("동"지역일 경우에는 공백, "리"지역일 경우에는 "읍" 또는 "면" 정보가 들어갑니다.)
 * @property {string} bname1English 법정리의 읍/면 이름의 영문 ("동"지역일 경우에는 공백, "리"지역일 경우에는 "읍" 또는 "면" 정보가 들어갑니다.)
 * @property {string} bname2 법정동/법정리 이름
 * @property {string} bname2English 법정동/법정리 이름의 영문
 * @property {string} sido 도/시 이름
 * @property {string} sidoEnglish 도/시 이름의 영문
 * @property {string} sigungu 시/군/구 이름
 * @property {string} sigunguEnglish 시/군/구 이름의 영문
 * @property {string} sigunguCode 시/군/구 코드 (5자리 구성된 시/군/구 코드입니다.)
 * @property {string} userLanguageType 검색 결과에서 사용자가 선택한 주소의 언어 타입: K(한글주소), E(영문주소)
 * @property {string} query 사용자가 입력한 검색어
 * @property {string} buildingName 건물명
 * @property {string} buildingCode 건물관리번호
 * @property {string} apartment 공동주택 여부 (아파트,연립주택,다세대주택 등)
 * @property {string} jibunAddress 지번 주소 (도로명:지번 주소가 1:N인 경우에는 데이터가 공백으로 들어갈 수 있습니다.
 * @property {string} jibunAddressEnglish 영문 지번 주소
 * @property {string} roadAddress 도로명 주소 (지번:도로명 주소가 1:N인 경우에는 데이터가 공백으로 들어갈 수 있습니다.
 * @property {string} roadAddressEnglish 영문 도로명 주소
 * @property {string} autoRoadAddress '지번주소'에 매핑된 '도로명주소'가 여러개인 경우, 사용자가 '선택안함' 또는 '지번주소'를 클릭했을 때 연관된 도로명 주소 중 임의로 첫번째 매핑 주소를 넣어서 반환합니다. (autoMapping을 false로 설정한 경우에는 값이 채워지지 않습니다.)
 * @property {string} autoRoadAddressEnglish autoRoadAddress의 영문 도로명 주소
 * @property {string} autoJibunAddress '도로명주소'에 매핑된 '지번주소'가 여러개인 경우, 사용자가 '선택안함' 또는 '도로명주소'를 클릭했을 때 연관된 지번 주소 중 임의로 첫번째 매핑 주소를 넣어서 반환합니다. (autoMapping을 false로 설정한 경우에는 값이 채워지지 않습니다.)
 * @property {string} autoJibunAddressEnglish autoJibunAddress의 영문 지번 주소
 * @property {string} userSelectedType 검색 결과에서 사용자가 선택한 주소의 타입
 * @property {string} noSelected 연관 주소에서 "선택 안함" 부분을 선택했을때를 구분할 수 있는 상태변수
 * @property {string} hname 행정동 이름, 검색어를 행정동으로 검색하고, 검색결과의 법정동과 검색어에 입력한 행정동과 다른 경우에 표시하고, 데이터를 내립니다.
 * @property {string} roadnameCode 도로명 코드, 7자리로 구성된 도로명 코드입니다. 추후 7자리 이상으로 늘어날 수 있습니다.
 * @property {string} roadname 도로명 값, 검색 결과 중 선택한 도로명주소의 "도로명" 값이 들어갑니다.(건물번호 제외)
 * @property {string} roadnameEnglish 도로명 값, 검색 결과 중 선택한 도로명주소의 "도로명의 영문" 값이 들어갑니다.(건물번호 제외)
 */

/**
 * @callback OnComplete
 * @param {DaumSeachMapResult} data
 */

/**
 * @typedef OpenOption
 * @property {string} q 검색어
 * @property {number} left 팝업위치 x값
 * @property {number} top 팝업위치 y값
 * @property {string} popupTitle 팝업창 구분값
 * @property {boolean} autoClose 자동 닫힘 유무
 */

/**
 * @callback Open
 * @param {OpenOption} option
 */

/**
 * @typedef EmbedOption
 * @property {string} q 검색어
 * @property {boolean} autoClose 자동 닫힘 유무
 */

/**
 * @callback Embed
 * @param {HTMLElement} element
 * @param {EmbedOption} option
 */

/**
 * @typedef DaumPostcode
 * @property {500} width
 * @property {600} height
 * @property {Open} open
 * @property {Embed} embed
 */

export default {};
