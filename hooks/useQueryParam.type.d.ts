/* eslint-disable no-unused-vars */
interface Param<
    T extends
        | StringConstructor
        | NumberConstructor
        | BooleanConstructor = StringConstructor,
> {
    key: string;
    parser?: T;
    defaultValue?: ReturnType<T>;
}

interface ParamWithoutParser<DefaultValue> {
    key: string;
    defaultValue: DefaultValue;
}

export interface UseQueryParam {
    (): undefined;
    (param: { key: string }): string;
    <T>(param: Omit<Param<T>, 'key'>): undefined;
    <DefaultValue>(param: ParamWithoutParser<DefaultValue>): DefaultValue;
    <T>(param: Param<T>): ReturnType<T>;
}
