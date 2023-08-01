import { LOGO_LINK } from '@/constants/common';

// TODO: 실제 url로 변경 필요
export const MENU_LIST = [
    {
        menuHeader: '재단 소개',
        menuListGroup: [
            {
                content: '디지털 새싹 홈페이지',
                to: LOGO_LINK,
            },
            {
                content: '디지털 새싹 블로그',
                to: 'https://goorm.co',
            },
        ],
    },
    {
        menuHeader: '프로그램 탐색',
        menuListGroup: [
            {
                content: '프로그램 리스트',
                to: LOGO_LINK,
            },
            {
                content: '운영 기관 리스트',
                to: `${LOGO_LINK}/institutions`,
            },
        ],
    },
    {
        menuHeader: '내 정보 관리',
        menuListGroup: [
            {
                content: '내 정보 수정',
                to: 'https://goorm.co',
            },
        ],
    },
];

export const POLICY_LIST = [
    {
        content: '이용약관',
        to: 'https://goorm.co',
    },
    {
        content: '개인정보처리방침',
        to: 'https://goorm.co',
    },
];

export const COMPANY_INFO_LIST = [
    [
        '주소 06130) 서울시 강남구 테헤란로 7길 22(역삼동, 과학기술회관 2관) 한국과학창의재단(4~5층)',
        '캠프 신청&접수 문의 이메일 contact@goorm.io',
    ],
    [
        '디지털새싹 캠프 관련 문의 (운영시간 : 10:00 ~17:00)',
        '디지털 새싹 운영 문의 contact@goorm.io',
    ],
    ['ⓒ goorm Inc. All Rights Reserved.', 'powered by goorm'],
];
