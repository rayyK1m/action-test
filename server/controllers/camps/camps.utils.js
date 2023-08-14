import invert from 'lodash/invert';

import { CAMP_FILE_LIST } from '@/constants/db';

export const getEducationStatus = (start, end) => [
    {
        condition: new Date() < start,
        status: '교육 예정',
    },
    {
        condition: start <= new Date() && end >= new Date(),
        status: '교육 진행 중',
    },
    {
        condition: new Date() > end,
        status: '교육 종료',
    },
];

/**
 * 캠프 보고서 제출 API의 report Type별, key Map 제공
 */
export const getSDKKeyMap = (reportType, isFromClient = true) => {
    let keyMap = {};

    /** preFileReport */
    if (reportType === CAMP_FILE_LIST.사전_제출.id) {
        keyMap = {
            [CAMP_FILE_LIST.사전_제출.children.안전_관리_체크리스트.id]:
                'camp-A',
            [CAMP_FILE_LIST.사전_제출.children.안전_관리_서약서.id]: 'camp-B',
            [CAMP_FILE_LIST.사전_제출.children.성범죄조회_동의서.id]: 'camp-C',
            [CAMP_FILE_LIST.사전_제출.children.기타.id]: 'camp-D',
        };
    } else if (reportType === CAMP_FILE_LIST.종료_제출.id) {
        /** postFileReport */
        keyMap = {
            [CAMP_FILE_LIST.종료_제출.children.결과_보고서.id]: 'camp-A',
            [CAMP_FILE_LIST.종료_제출.children.기타.id]: 'camp-B',
        };
    } else {
        /** postReport */
        keyMap = {
            [CAMP_FILE_LIST.결과_보고.children.신청_인원.id]: 'applicantCount',
            [CAMP_FILE_LIST.결과_보고.children.참여_인원.id]:
                'participantCount',
            [CAMP_FILE_LIST.결과_보고.children.이수_인원.id]: 'completionCount',
            [CAMP_FILE_LIST.결과_보고.children.설문_참여_인원.id]:
                'surveyUserCount',
        };
    }
    return isFromClient ? keyMap : invert(keyMap);
};
