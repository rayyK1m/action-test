import { useRouter } from 'next/router';

/** @type {import('./useQueryParam.type').UseQueryParam} */
const useQueryParam = (
    /** @type {{key: string; parser: StringConstructor | NumberConstructor | BooleanConstructor; defaultValue: string | number | boolean}} */
    { key, parser = String, defaultValue },
) => {
    const router = useRouter();

    if (
        typeof parser !== 'object' &&
        parser?.name !== 'String' &&
        parser?.name !== 'Number' &&
        parser?.name !== 'Boolean'
    ) {
        throw new Error('지원하지 않는 타입입니다.');
    }

    if (key !== false && !key) return undefined;

    const queryValue = router.query[key] || defaultValue;

    switch (parser?.name.toLowerCase()) {
        case 'number':
            return Number.parseInt(String(queryValue || 0), 10);
        case 'boolean':
            return Boolean(queryValue || false);
    }

    switch (typeof defaultValue) {
        case 'number':
            return Number.parseInt(String(queryValue || 0), 10);
        case 'boolean':
            return Boolean(queryValue || false);
        case 'string':
        default:
            return String(queryValue || '');
    }
};

export default useQueryParam;
