const isProduction = process.env.NODE_ENV === 'production';

export default (err, req, res) => {
    // TODO: apm등의 장치와 연동 필요
    if (!isProduction) {
        console.error(err.stack);
    }

    const message = isProduction
        ? { error: '예상치 못한 에러가 발생했습니다.' }
        : { error: err.stack, meta: err.meta };
    return res.status(err.statusCode || 500).json(message);
};
