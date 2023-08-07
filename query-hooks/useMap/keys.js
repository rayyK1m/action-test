const mapKeys = {
    // NOTE: 사용법 통일을 위해 parameter가 없어도, 함수 형태로 작성해준다.
    all: () => ['map'],

    /**
     * 카카오 맵 API
     */
    kakaoMap: () => [...mapKeys.all(), 'kakao'],

    /**
     * 다음 맵 검색 API
     */
    daumSearchMap: () => [...mapKeys.all(), 'daum', 'search'],
};

export default mapKeys;
