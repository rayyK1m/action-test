// @ts-check
import dayjs from 'dayjs';
import { formatDate } from '@/utils';

/**
 * @typedef {1 | 2 | 3} ReviewStatus
 * @typedef {'집합형' | '방문형'} DivisionType
 * @typedef {'장기' | '단기'} DurationType
 * @typedef {'강원특별자치도' | '경기도' | '세종특별자치시' | '경상남도' | '경상북도' | '광주광역시' | '대구광역시' | '대전광역시' | '부산광역시' | '서울특별시' | '울산광역시' | '인천광역시' | '전라남도' | '전라북도' | '제주특별자치도' | '충청남도' | '충청북도'} OperateLocation
 *
 * @typedef ProgramDetailData
 * @property {ReviewStatus} [reviewStatus]
 * @property {string} [thumbnail]
 * @property {string} name 제목
 * @property {{ division: DivisionType; duration: DurationType }} type
 * @property {string} category ?
 * @property {number} price 비용
 * @property {string} [description] 프로그램 소개
 * @property {OperateLocation} operateLocation 운영 지역
 * @property {string} [contact] 문의처
 * @property {{ start: string; end: string }} applyDate 신청 기간 Date format
 * @property {{ elementarySchool?: Array<1 | 2 | 3 | 4 | 5 | 6>; middleSchool?: Array<1 | 2 | 3>; highSchool?: Array<1 | 2 | 3> }} [targetGroup] 신청 대상
 * @property {number} [learningTime] 총 교육 차시 단위: 시간
 * @property {{ start: string; end: string }} educationDate 교육 기간 Date format
 * @property {string} [curriculum] 커리큘럼
 * @property {Array<string>} attachedFiles 첨부파일
 * @property {string} [notice] 안내 사항
 * @property {{ name?: string; address?: string }} [educationLocation] 교육 장소
 */

/**
 *
 * @param {{ id: string }} param
 * @returns {Promise<ProgramDetailData>}
 */
export const getProgramDetail = async ({ id }) => {
    return await new Promise((res) => {
        setTimeout(() => {
            res({
                reviewStatus: 1,
                name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                category: '',
                price: 1000,
                description: `- 미래사회의 주된 이동, 운송 수단이 될 드론에 대해 알아보고 이를 통해 목적을 가진 드론을 설계해보는 활동을 진행한다.
                    - 이 과정에서 학생들은 인간과 컴퓨터의 연결, 즉 HCI를 생각하며 드론을 조종할 수 있는 조종기 역시 만들어 보도록 한다.
                    - 종합적으로 실제 기술을 인간 친화적인 관점과 목적으로 사람에게 도움이 되는 드론을 제작한다.`,
                operateLocation: '경상북도',
                contact: 'springswcamp23@kakaoenterprise.com',
                applyDate: {
                    start: formatDate('2023-06-01T00:00:00+09:00'),
                    end: formatDate('2023-06-09T00:00:00+09:00'),
                },
                targetGroup: {
                    elementarySchool: [1, 2, 3, 4, 5, 6],
                    middleSchool: [1, 2, 3],
                    highSchool: [1, 2, 3],
                },
                learningTime: 18,
                educationDate: {
                    start: formatDate('2023-06-01T00:00:00+09:00'),
                    end: formatDate('2023-06-09T00:00:00+09:00'),
                },
                curriculum: `CHAPTER1.
                - 우리의 일을 도와줄 로봇의 필요성 탐색, 산업용 로봇의 활용 알아보기
                - 드론의 사례 알아보기. 드론의 특징을 알아보기
                - 드론의 조종법 익혀보기, 조종 시뮬레이션
                CHAPTER2.
                - 드론 안전수칙 익히기, 드론 날리기
                - 코딩 드론 연결 방법 익히기, 코딩 드론 블록 익히기
                - 코딩으로 드론 길 따라 이동하기, 대회규칙 고지
                CHAPTER3.
                - 인간-컴퓨터 인터페이스, 인공지능으로 인터페이스 설계하기
                CHAPTER4.
                - 인공지능 코딩 드론으로 움직임 설계하기
                - 인공지능 안전 드론 설명회
                
                - 미래 기술이 가져다 줄 세상`,
                attachedFiles: ['https://picsum.photos/200/300'],
                notice: `14세 미만일 경우, 보호자가 대리 신청합니다.
                프로그램 참가는 확정 안내 이후 참여가 가능합니다.`,
                educationLocation: {
                    name: '인천 연수중학교',
                    address:
                        '인천 서구 로봇랜드로 155-11 로봇타워 2층 다목적실인천 서구 로봇랜드로 155-11 로봇타워 2층 다목적실',
                },
            });
        }, 0);
    });
};
