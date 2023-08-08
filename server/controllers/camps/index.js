import swcampSdk from '@/server/libs/swcamp';
import { PROGRAM_DIVISION } from '@/constants/db';

import validation from './validation';

const getEducationStatus = (start, end) => [
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

const getCamps = async (req, res) => {
    const { programId, institutionId, page = 1, limit = 10 } = req.query;

    const { items, total } = await swcampSdk.getCamps({
        programId,
        institutionId,
        page,
        limit,
    });

    const newItems = items.map((item) => {
        const {
            id,
            class: classNumber,
            name,
            type,
            educationDate,
            educationLocation,
            submitPreFileReport,
            submitPostFileReport,
            schoolIndex,
            isTemporary,
        } = item;
        return {
            id,
            /** 방문형 or 집합협 */
            divisionType: type.division,

            /** 분반 */
            classNumberStr: `${classNumber}분반`,

            /** 교육 장소 */
            // TODO: 방문형의 경우 교육장소는 소속학교로 표기하기 (임시로 school index)
            classroom:
                type.division === PROGRAM_DIVISION.방문형
                    ? schoolIndex
                    : educationLocation.name,

            /** 캠프명 */
            name,

            /** 교육 진행 상태 */
            classStatus: getEducationStatus(
                educationDate.start,
                educationDate.end,
            ).find((i) => i.condition).status,

            /** 사전 자료 */
            submitPreFileReport,

            /** 종료 자료 */
            submitPostFileReport,

            /** 필수 정보 입력 여부 */
            isTemporary:
                type.division === PROGRAM_DIVISION.집합형
                    ? isTemporary
                    : undefined,

            /** 채널 링크 */
            channelLink: `https://${schoolIndex}.goorm.io`,
        };
    });

    return res.json({ items: newItems, total });
};

const createCamp = async (req, res) => {
    const formData = req.body;
    const data = await swcampSdk.createCamp({
        userId: req.session?.id,
        formData: { ...formData, institutionId: req.session?.institutionId },
    });

    return res.json(data);
};

export default { validation, getCamps, createCamp };
