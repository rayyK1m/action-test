import swcampSdk from '@/server/libs/swcamp';

const getPrograms = async (req, res) => {
    const {
        page = 1,
        limit = 4,
        search,
        campType,
        category,
        operateLocation,
    } = req.query;
    const { items, total } = await swcampSdk.getPrograms({
        page,
        limit,
        search,
        campType,
        category,
        operateLocation,
    });

    return res.json({ items, total });
};

const getProgram = async (req, res) => {
    const { id } = req.query;

    const data = await swcampSdk.getProgram({
        programId: id,
    });

    return res.json(data);
};

const programsCtrl = { getPrograms, getProgram };

export default programsCtrl;
