import swcampSdk from '@/server/libs/swcamp';
import { transformWithKeyMap } from '@/server/utils/common';

import validation from './validation';
import { getEducationStatus, getSDKKeyMap } from './camps.utils';

import { CAMP_FILE_LIST, PROGRAM_DIVISION } from '@/constants/db';

const getCamp = async (req, res) => {
    const { id: campId } = req.query;
    const {
        item: { preFileReport, postFileReport, postReport, ...rest },
    } = await swcampSdk.getCamp({
        userId: req.session?.id,
        campId,
        institutionId: req.session?.institutionId,
    });

    const convertedPreFileReports = preFileReport.map((item) => {
        const convertedPreFileReport = transformWithKeyMap(
            item,
            getSDKKeyMap(CAMP_FILE_LIST.사전_제출.id, false),
        );

        // TODO: SDK server에서 label->filename으로 수정돼야함.
        const temp = {};
        for (const key in convertedPreFileReport) {
            temp[key] = {
                filename: convertedPreFileReport[key].url,
                url: convertedPreFileReport[key].url,
            };
        }

        return {
            ...temp,
        };
    });
    const convertedPostFileReports = postFileReport.map((item) => {
        const convertedPostFileReport = transformWithKeyMap(
            item,
            getSDKKeyMap(CAMP_FILE_LIST.종료_제출.id, false),
        );

        // TODO: SDK server에서 label->filename으로 수정돼야함.
        const temp = {};
        for (const key in convertedPostFileReport) {
            temp[key] = {
                filename: convertedPostFileReport[key].url,
                url: convertedPostFileReport[key].url,
            };
        }

        return {
            ...temp,
        };
    });
    const convertedPostReports = postReport.map((item) => {
        const convertedPostReport = transformWithKeyMap(
            item,
            getSDKKeyMap(CAMP_FILE_LIST.결과_보고.id, false),
        );

        return {
            ...convertedPostReport,
        };
    });

    return res.json({
        preFileReport: convertedPreFileReports,
        postFileReport: convertedPostFileReports,
        postReport: convertedPostReports,
        ...rest,
    });
};

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

const getCampClasses = async (req, res) => {
    const { programId } = req.query;

    const { items } = await swcampSdk.getCampClasses({
        userId: req.session?.id,
        institutionId: req.session?.institutionId || null,

        programId,
    });

    function compareByClass(a, b) {
        return a.class - b.class;
    }
    const classes = items.sort(compareByClass);
    return res.json(classes);
};

const addCampParticipants = async (req, res) => {
    const { id: campId } = req.query;
    const { campTicketIdList } = req.body;

    const { result } = await swcampSdk.addCampParticipants({
        userId: req.session?.id,
        institutionId: req.session?.institutionId,

        campId,
        campTicketIdList,
    });

    return res.json(result);
};

const deleteCampParticipants = async (req, res) => {
    const { id: campId } = req.query;
    const { campTicketIdList } = req.body;

    const { result } = await swcampSdk.deleteCampParticipants({
        userId: req.session?.id,
        institutionId: req.session?.institutionId,

        campId,
        campTicketIdList,
    });

    return res.json(result);
};

const createCamp = async (req, res) => {
    const formData = req.body;
    const data = await swcampSdk.createCamp({
        userId: req.session?.id,
        formData: { ...formData, institutionId: req.session?.institutionId },
    });

    return res.json(data);
};

const patchCamp = async (req, res) => {
    const { id: campId } = req.query;
    const formData = req.body;

    const { data } = swcampSdk.patchCamp({
        userId: req.session?.id,
        institutionId: req.session?.institutionId,
        campId,
        formData,
    });
    return res.json(data);
};

const postCampReport = async (req, res) => {
    const { id: campId, reportType } = req.query;
    const formData = req.body;

    /** client req body 에서 넘어온 object를 swcampSDK body에 맞게 object 변환 */
    const reporTypeKeyMap = getSDKKeyMap(reportType);
    const convertedFormData = transformWithKeyMap(formData, reporTypeKeyMap);

    const { item } = await swcampSdk.postCampReport({
        userId: req.session?.id,
        institutionId: req.session?.institutionId,
        reportType,
        campId,
        formData: convertedFormData,
    });

    return res.json(item);
};

export default {
    validation,

    /** controller methods */
    getCamps,
    getCamp,
    createCamp,
    patchCamp,
    getCampClasses,
    addCampParticipants,
    deleteCampParticipants,
    postCampReport,
};
