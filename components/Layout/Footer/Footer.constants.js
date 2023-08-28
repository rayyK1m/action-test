import {
    EMAIL_LIST,
    NEWSAC_LINK,
    POLICY_AND_TERMS_LINK,
} from '@/constants/common';

export const MENU_LIST = [
    {
        menuHeader: '사업 소개',
        menuListGroup: [
            {
                content: '디지털 새싹 홈페이지',
                to: NEWSAC_LINK.홈페이지,
            },
            {
                content: '디지털 새싹 블로그',
                to: NEWSAC_LINK.블로그,
            },
        ],
    },
    {
        menuHeader: '프로그램 탐색',
        menuListGroup: [
            {
                content: '프로그램 리스트',
                to: '/',
            },
            {
                content: '운영 기관 리스트',
                to: `/institutions`,
            },
        ],
    },
    {
        menuHeader: '내 정보 관리',
        menuListGroup: [
            {
                content: '내 정보 수정',
                to: '/change_info',
            },
        ],
    },
];

export const POLICY_LIST = [
    {
        content: '이용약관',
        to: POLICY_AND_TERMS_LINK.이용약관,
    },
    {
        content: '개인정보처리방침',
        to: POLICY_AND_TERMS_LINK.개인정보처리방침,
    },
];

export const COMPANY_INFO_LIST = [
    [
        '주소 06130) 서울시 강남구 테헤란로 7길 22(역삼동, 과학기술회관 2관) 한국과학창의재단(4~5층)',
        '디지털새싹 캠프 문의 (운영시간: 10:00 ~ 17:00)',
    ],
    [
        '디지털새싹 캠프 문의 전화 010-2476-9675 / 010-2476-4032',
        `디지털새싹 캠프 문의 이메일 ${EMAIL_LIST.kofac}`,
    ],
    [
        '사업관리시스템 문의 전화 031-600-8586',
        `사업관리시스템 문의 이메일 ${EMAIL_LIST.newsac}`,
    ],
    ['Powered by goorm'],
];
