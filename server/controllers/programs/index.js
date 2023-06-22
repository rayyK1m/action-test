import { withSessionRoute } from '@/server/utils/auth';
import swcampSdk from '@/server/libs/swcamp';

// NOTE: 아래 코드들은 모두 예시입니다
const getProgram = withSessionRoute(async (req, res) => {
    const userData = req.session;
    const data = await swcampSdk.getProgram();

    return res.json({ results: true, userData: userData, data });
});

const createProgram = async (req, res) => {
    await swcampSdk.createProgram();

    return res.json({ results: true });
};

export default { getProgram, createProgram };
