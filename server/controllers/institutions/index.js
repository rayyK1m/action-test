import swcampSdk from '@/server/libs/swcamp';
import validation from './validation';
import {
    DEFAULT_FILE_OBJECT,
    REQUIRED_FILE_SUBMIT_STATUS,
} from '@/constants/db';

const getInstitutions = async (req, res) => {
    const { page, limit = 16, search, active = false } = req.query;

    const { items, total } = await swcampSdk.getInstitutions({
        page,
        limit,
        search,
        active,
    });

    return res.json({ items, total });
};

const getInstitution = async (req, res) => {
    const { institutionId } = req.query;
    const { item } = await swcampSdk.getInstitution(institutionId);

    return res.json({
        name: item?.name || '이름 없음',
        institutionId: item?.id,
        logo: item?.logo,
    });
};

const getInstitutionAdmin = async (req, res) => {
    const { institutionId } = req.query;
    const { item } = await swcampSdk.getInstitutionAdmin({
        institutionId,
        userId: req.session?.id,
    });

    const fileObject = item?.reports?.fileObject
        ? Object.entries(item.reports.fileObject).reduce(
              (acc, [key, value]) => {
                  /** NOTE
                   * 현재 *server에서 로직 수정*하기에는 리소스가 부족해서 BFF에서 임시 조치하기로 함
                   *
                   * server에서 수정해야하는 로직 요약
                   * query에 현재 programId를 담아서 보내면 필터링한 후 limit만큼 받고 싶으나,
                   * 현재 리소스 부족으로 인해 3개를 받아온 후 프론트에서 필터링하고 있음
                   * */
                  if (value.label !== '추가 자료') {
                      acc[key] = value;
                  }
                  return acc;
              },
              {},
          )
        : DEFAULT_FILE_OBJECT;

    return res.json({
        ...item,
        reports: {
            ...(item?.reports && item.reports),
            reviewStatus:
                item?.reports?.reviewStatus ||
                REQUIRED_FILE_SUBMIT_STATUS.미제출.key,
            fileObject,
        },
        name: item?.name || '이름 없음',
    });
};

const getInstitutionsFoundation = async (req, res) => {
    const { page, limit, search, sort } = req.query;

    const { items, total } = await swcampSdk.getInstitutionsFoundation({
        userId: req.session?.id,
        page,
        limit,
        search,
        sort,
    });

    return res.json({ items, totalCount: total });
};

const submitReports = async (req, res) => {
    const { institutionId } = req.query;
    const { id: userId } = req.session || {};

    const fileObject = req.body;
    const data = await swcampSdk.submitReports({
        userId,
        institutionId,
        fileObject,
    });
    return res.json(data);
};

const patchReports = async (req, res) => {
    const { institutionId, reviewStatus } = req.query;
    const { id: userId } = req.session || {};

    const { fileObject } = req.body;
    const data = await swcampSdk.patchReports({
        userId,
        institutionId,
        fileObject,
        reviewStatus,
    });
    return res.json(data);
};

const submitExtraReports = async (req, res) => {
    const { institutionId } = req.query;
    const { id: userId } = req.session || {};

    const fileObject = req.body;
    const data = await swcampSdk.submitExtraReports({
        userId,
        institutionId,
        fileObject,
    });
    return res.json(data);
};

const submitReportReview = async (req, res) => {
    const { institutionId } = req.query;
    const { id: userId } = req.session || {};

    const { reviewStatus, feedback } = req.body;
    const data = await swcampSdk.submitReportReview({
        userId,
        institutionId,
        reviewStatus,
        feedback,
    });
    return res.json(data);
};

const institutionsCtrl = {
    getInstitutions,
    getInstitution,
    getInstitutionAdmin,
    getInstitutionsFoundation,
    submitReports,
    patchReports,
    submitExtraReports,
    submitReportReview,
    validation,
};

export default institutionsCtrl;
