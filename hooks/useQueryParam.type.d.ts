/* eslint-disable no-unused-vars */
interface Param<T> {
    key: string;
    parser?: (value: string | string[]) => T;
}

export interface UseQueryParam {
    (): undefined;
    (param: { key: string }): string;
    <T>(param: Param<T>): T;
}
