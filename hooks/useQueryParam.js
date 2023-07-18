import { useRouter } from 'next/router';

/**
 * ex) 아래와 같이 생성자를 넘겨줄 수도, 파싱 함수를 넘겨줄 수도 있음
 * useQueryParam({key: 'page', parser: Number});
 * useQueryParam({key: customKey', parser: (value) => value.toLowerCase()});
 * useQueryParam({key: customKey2'});
 */
/** @type {import('./useQueryParam.type').UseQueryParam} */
const useQueryParam = ({ key, parser = String }) => {
    const router = useRouter();
    const queryValue = router.query[key];
    if (!queryValue || !key) return undefined;
    if (parser.name === 'Boolean') {
        return Boolean(queryValue && queryValue !== 'false');
    }

    return parser(queryValue);
};

export default useQueryParam;
