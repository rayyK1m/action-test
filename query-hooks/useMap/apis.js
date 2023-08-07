const getKaKaoMapScript = async () => {
    return await new Promise((res, rej) => {
        const $mapScript = document.createElement('script');
        $mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_APP_KEY}&autoload=false&libraries=services,drawing`;
        $mapScript.onload = () => {
            window.kakao.maps.load(() => res(window.kakao.maps));
        };
        $mapScript.onerror = rej;
        document.head.append($mapScript);
    });
};

/**
 *
 * @param {{ onComplete: import('./types').OnComplete }} param
 * @returns {Promise<import('./types').DaumPostcode>}
 */
const getDaumSearchMapScript = async ({ onComplete = () => {} }) =>
    await new Promise((res, rej) => {
        const { width, height } = /** @type {const} */ ({
            width: 500,
            height: 600,
        });
        const $mapSearchScript = document.createElement('script');
        $mapSearchScript.src =
            '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        $mapSearchScript.onload = () => {
            const postCodeInstance = new window.daum.Postcode({
                width,
                height,
                oncomplete: onComplete,
            });

            postCodeInstance.width = width;
            postCodeInstance.height = height;
            res(postCodeInstance);
        };
        $mapSearchScript.onerror = rej;
        document.head.append($mapSearchScript);
    });

const mapApis = {
    getKaKaoMapScript,
    getDaumSearchMapScript,
};
export default mapApis;
