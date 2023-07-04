/* eslint-disable no-unused-vars */

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    PreviewData,
} from 'next';

import type { ParsedUrlQuery } from 'querystring';

export interface CustomGetServerSidePropsContext<
    Req,
    Params extends ParsedUrlQuery = ParsedUrlQuery,
    Preview extends PreviewData = PreviewData,
> extends GetServerSidePropsContext<Params, Preview> {
    req: Req & GetServerSidePropsContext<Params, Preview>['req'];
}

export interface CustomGetServerSideProps<
    Req,
    Props extends { [key: string]: any } = { [key: string]: any },
    Params extends ParsedUrlQuery = ParsedUrlQuery,
    Preview extends PreviewData = PreviewData,
> {
    (context: CustomGetServerSidePropsContext<Req, Params, Preview>): Promise<
        GetServerSidePropsResult<Props>
    >;
}
